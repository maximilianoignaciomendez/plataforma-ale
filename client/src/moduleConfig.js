// Central registry describing every module and its sections. Used to build
// sidebar navigation, the landing hub tiles, and the routes themselves so
// there is a single source of truth for "what pages exist in this module".

export const MODULES = {
  produccion: {
    title: "Producción",
    subtitle: "Operación y control de la producción",
    basePath: "/produccion",
    theme: "produccion",
    badge: "P",
    sections: [
      { key: "ordenes", path: "ordenes-trabajo", label: "Órdenes de Trabajo", desc: "Cliente, N° de OC, insumos" },
      { key: "planificacion", path: "planificacion-diaria", label: "Planificación Diaria", desc: "Documentos y control de calidad" },
      { key: "avance", path: "avance-produccion", label: "Avance de Producción", desc: "Indicadores visuales" },
      { key: "procedimientos", path: "procedimientos", label: "Procedimientos e Instructivos", desc: "Carga de documentos" },
      { key: "rechazos", path: "rechazos-no-conformes", label: "Rechazos / No Conformes", desc: "Registro de calidad" },
      { key: "incidentes", path: "reportar-incidente", label: "Reportar Incidente", desc: "Condiciones inseguras" },
      { key: "tareas", path: "tareas-pendientes", label: "Tareas Pendientes", desc: "Seguimiento y cierre" },
    ],
  },
  logistica: {
    title: "Logística y Mantenimiento",
    subtitle: "Materiales, inventario y mantenimiento de activos",
    basePath: "/logistica",
    theme: "logistica",
    badge: "L",
    sections: [
      { key: "recepcion", path: "recepcion-materiales", label: "Recepción de Materiales", desc: "Código, cantidad, proveedor" },
      { key: "inventario", path: "inventario", label: "Inventario", desc: "Ligado a recepción de materiales" },
      { key: "despachos", path: "guia-despachos", label: "Guía de Despachos", desc: "Carga de documentos" },
      { key: "trazabilidad", path: "trazabilidad", label: "Trazabilidad", desc: "Cotización, OC, guía, factura" },
      { key: "mant-prev", path: "mantenimiento-preventivo", label: "Mantenimiento Preventivo", desc: "Carga de documentos" },
      { key: "mant-corr", path: "mantenimiento-correctivo", label: "Mantenimiento Correctivo", desc: "Carga de documentos" },
      { key: "fallas", path: "fallas-averias", label: "Fallas y Averías", desc: "Texto y observaciones" },
      { key: "equipos", path: "historial-equipos", label: "Historial de Equipos", desc: "Nombre, marca, año" },
      { key: "repuestos", path: "repuestos-consumibles", label: "Repuestos y Consumibles", desc: "Stock de repuestos" },
    ],
  },
  sig: {
    title: "SIG",
    subtitle: "Sistema Integrado de Gestión (ISO 9001 · 14001 · 45001)",
    basePath: "/sig",
    theme: "sig",
    badge: "S",
    sections: [
      { key: "vigentes", path: "documentos-vigentes", label: "Documentos Vigentes", desc: "Carga de documentos" },
      { key: "registros", path: "registros", label: "Registros", desc: "Carga de documentos" },
      { key: "matrices", path: "matrices", label: "Matrices", desc: "Carga de documentos" },
      { key: "hallazgos", path: "hallazgos-inspecciones", label: "Hallazgos e Inspecciones", desc: "Rechazos + Fallas y averías" },
      { key: "no-conformidades", path: "no-conformidades", label: "No Conformidades", desc: "Carga de documentos" },
      { key: "acciones", path: "acciones-correctivas", label: "Acciones Correctivas", desc: "Carga de documentos" },
      { key: "capacitaciones", path: "capacitaciones", label: "Capacitaciones", desc: "Carga de documentos" },
      { key: "indicadores", path: "indicadores-reportes", label: "Indicadores y Reportes", desc: "Carga de documentos" },
      { key: "ambiental", path: "aspectos-ambientales-sst", label: "Aspectos Ambientales y SST", desc: "Carga de documentos" },
    ],
  },
  admin_finanzas: {
    title: "Administración y Finanzas",
    subtitle: "Exclusivo para Gerencia de Administración y Finanzas",
    basePath: "/admin-finanzas",
    theme: "admin_finanzas",
    badge: "AF",
    sections: [],
  },
  sig_gerencia: {
    title: "SIG (Gerencia)",
    subtitle: "SIG con agregados de Gerencia",
    basePath: "/sig-gerencia",
    theme: "gerencia",
    badge: "SG",
    sections: [],
  },
  rrhh: {
    title: "Recursos Humanos",
    subtitle: "Módulo de Gerencia",
    basePath: "/rrhh",
    theme: "gerencia",
    badge: "RH",
    sections: [],
  },
};

// Document-only sections (pure "carga de documentos"), keyed by module.path,
// reused by the generic DocumentSectionPage instead of one file each.
export const DOCUMENT_SECTIONS = {
  "produccion/procedimientos": { modulo: "produccion", seccion: "procedimientos", title: "Procedimientos e Instructivos" },
  "logistica/despachos": { modulo: "logistica", seccion: "guia_despachos", title: "Guía de Despachos" },
  "logistica/mant-prev": { modulo: "logistica", seccion: "mantenimiento_preventivo", title: "Mantenimiento Preventivo" },
  "logistica/mant-corr": { modulo: "logistica", seccion: "mantenimiento_correctivo", title: "Mantenimiento Correctivo" },
  "sig/vigentes": { modulo: "sig", seccion: "documentos_vigentes", title: "Documentos Vigentes" },
  "sig/registros": { modulo: "sig", seccion: "registros", title: "Registros" },
  "sig/matrices": { modulo: "sig", seccion: "matrices", title: "Matrices" },
  "sig/no-conformidades": { modulo: "sig", seccion: "no_conformidades", title: "No Conformidades" },
  "sig/acciones": { modulo: "sig", seccion: "acciones_correctivas", title: "Acciones Correctivas" },
  "sig/capacitaciones": { modulo: "sig", seccion: "capacitaciones", title: "Capacitaciones" },
  "sig/indicadores": { modulo: "sig", seccion: "indicadores_reportes", title: "Indicadores y Reportes" },
  "sig/ambiental": { modulo: "sig", seccion: "aspectos_ambientales_sst", title: "Aspectos Ambientales y SST" },
};

export function landingModulesForRole(role) {
  if (role === "produccion") return ["produccion"];
  if (role === "logistica") return ["logistica"];
  if (role === "sig") return ["sig"];
  if (role === "admin_finanzas") return ["admin_finanzas"];
  if (role === "gerencia") return ["produccion", "logistica", "sig", "sig_gerencia", "rrhh"];
  return [];
}
