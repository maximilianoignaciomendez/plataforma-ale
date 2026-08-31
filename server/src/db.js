import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "..", "data.sqlite");

export const db = new DatabaseSync(dbPath);
db.exec("PRAGMA journal_mode = WAL");
db.exec("PRAGMA foreign_keys = ON");

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL, -- produccion | logistica | sig | admin_finanzas | gerencia
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Producción ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ordenes_trabajo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cliente TEXT NOT NULL,
  numero_orden_compra TEXT NOT NULL,
  cantidad_insumos INTEGER NOT NULL DEFAULT 0,
  completa INTEGER NOT NULL DEFAULT 0,
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS planificacion_diaria (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre_documento TEXT NOT NULL,
  control_calidad INTEGER NOT NULL DEFAULT 0,
  fecha_entrega TEXT,
  completa INTEGER NOT NULL DEFAULT 0,
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS incidentes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  texto TEXT NOT NULL,
  estado TEXT NOT NULL DEFAULT 'abierto',
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS tareas_pendientes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  texto TEXT NOT NULL,
  estado TEXT NOT NULL DEFAULT 'pendiente', -- pendiente | seguimiento | cerrada
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS rechazos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  descripcion TEXT NOT NULL,
  orden_trabajo_id INTEGER,
  estado TEXT NOT NULL DEFAULT 'abierto',
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (orden_trabajo_id) REFERENCES ordenes_trabajo(id) ON DELETE SET NULL
);

-- Logística y mantenimiento ----------------------------------------------
CREATE TABLE IF NOT EXISTS recepcion_materiales (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  codigo TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  cantidad INTEGER NOT NULL DEFAULT 0,
  proveedor TEXT,
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS historial_equipos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre_equipo TEXT NOT NULL,
  marca TEXT,
  anio TEXT,
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS repuestos_consumibles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  marca TEXT,
  descripcion TEXT,
  cantidad INTEGER NOT NULL DEFAULT 0,
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS fallas_averias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  texto TEXT NOT NULL,
  observacion TEXT,
  estado TEXT NOT NULL DEFAULT 'abierto',
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Documentos (usado por Procedimientos, Guía de Despachos, Trazabilidad, --
-- Mantenimiento, y todas las secciones documentales de SIG) --------------
CREATE TABLE IF NOT EXISTS documentos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  modulo TEXT NOT NULL,
  seccion TEXT NOT NULL,
  subtipo TEXT,
  nombre_original TEXT NOT NULL,
  ruta_archivo TEXT NOT NULL,
  mime_type TEXT,
  tamano INTEGER,
  descripcion TEXT,
  uploaded_by TEXT,
  uploaded_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`);

// --- Table registry for generic CRUD endpoints --------------------------
// Every entry maps a REST resource name to its SQL table, the module that
// gates access to it, and the editable columns (with basic types used for
// coercion). "checkbox" columns are stored as 0/1 integers.
export const TABLE_REGISTRY = {
  ordenes_trabajo: {
    module: "produccion",
    columns: {
      cliente: "text",
      numero_orden_compra: "text",
      cantidad_insumos: "number",
      completa: "checkbox",
    },
  },
  planificacion_diaria: {
    module: "produccion",
    columns: {
      nombre_documento: "text",
      control_calidad: "checkbox",
      fecha_entrega: "date",
      completa: "checkbox",
    },
  },
  incidentes: {
    module: "produccion",
    columns: { texto: "text" },
  },
  tareas_pendientes: {
    module: "produccion",
    columns: { texto: "text", estado: "text" },
    touchUpdatedAt: true,
  },
  rechazos: {
    module: "produccion",
    columns: { descripcion: "text", orden_trabajo_id: "number", estado: "text" },
  },
  recepcion_materiales: {
    module: "logistica",
    columns: {
      codigo: "text",
      descripcion: "text",
      cantidad: "number",
      proveedor: "text",
    },
  },
  historial_equipos: {
    module: "logistica",
    columns: { nombre_equipo: "text", marca: "text", anio: "text" },
  },
  repuestos_consumibles: {
    module: "logistica",
    columns: {
      nombre: "text",
      marca: "text",
      descripcion: "text",
      cantidad: "number",
    },
  },
  fallas_averias: {
    module: "logistica",
    columns: { texto: "text", observacion: "text", estado: "text" },
  },
};

// --- Role / module access ------------------------------------------------
// Trabajadores only ever see their own module. Gerencia (general) sees the
// operational modules plus the still-in-progress SIG-gerencia and RRHH
// spaces. Gerencia de Administración y Finanzas is its own separate,
// exclusive module (per spec it is NOT included in "toda la Gerencia").
export const ROLE_MODULES = {
  produccion: ["produccion"],
  logistica: ["logistica"],
  sig: ["sig"],
  admin_finanzas: ["admin_finanzas"],
  gerencia: ["produccion", "logistica", "sig", "sig_gerencia", "rrhh"],
};

export function canAccessModule(user, moduleName) {
  const allowed = ROLE_MODULES[user.role] || [];
  return allowed.includes(moduleName);
}
