import { Router } from "express";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { db, canAccessModule } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsRoot = path.join(__dirname, "..", "..", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(uploadsRoot, req.body.modulo || "otros", req.body.seccion || "general");
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const stamp = Date.now();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    cb(null, `${stamp}-${safeName}`);
  },
});

const upload = multer({ storage, limits: { fileSize: 25 * 1024 * 1024 } });

const router = Router();
router.use(requireAuth);

router.get("/", (req, res) => {
  const { modulo, seccion } = req.query;
  if (!modulo) return res.status(400).json({ error: "Falta el parámetro modulo" });
  if (!canAccessModule(req.user, modulo)) {
    return res.status(403).json({ error: "No tienes acceso a este módulo" });
  }
  let sql = "SELECT * FROM documentos WHERE modulo = ?";
  const params = [modulo];
  if (seccion) {
    sql += " AND seccion = ?";
    params.push(seccion);
  }
  sql += " ORDER BY id DESC";
  res.json({ rows: db.prepare(sql).all(...params) });
});

router.post("/", upload.single("archivo"), (req, res) => {
  const { modulo, seccion, subtipo, descripcion } = req.body;
  if (!modulo || !seccion || !req.file) {
    return res.status(400).json({ error: "Faltan datos: modulo, seccion y archivo son requeridos" });
  }
  if (!canAccessModule(req.user, modulo)) {
    return res.status(403).json({ error: "No tienes acceso a este módulo" });
  }
  const relPath = path.relative(uploadsRoot, req.file.path);
  const stmt = db.prepare(
    `INSERT INTO documentos (modulo, seccion, subtipo, nombre_original, ruta_archivo, mime_type, tamano, descripcion, uploaded_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  const info = stmt.run(
    modulo,
    seccion,
    subtipo || null,
    req.file.originalname,
    relPath,
    req.file.mimetype,
    req.file.size,
    descripcion || null,
    req.user.full_name || req.user.username
  );
  const row = db.prepare("SELECT * FROM documentos WHERE id = ?").get(info.lastInsertRowid);
  res.status(201).json({ row });
});

router.get("/:id/download", (req, res) => {
  const doc = db.prepare("SELECT * FROM documentos WHERE id = ?").get(req.params.id);
  if (!doc) return res.status(404).json({ error: "Documento no encontrado" });
  if (!canAccessModule(req.user, doc.modulo)) {
    return res.status(403).json({ error: "No tienes acceso a este módulo" });
  }
  const filePath = path.join(uploadsRoot, doc.ruta_archivo);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: "Archivo no disponible" });
  res.download(filePath, doc.nombre_original);
});

router.delete("/:id", (req, res) => {
  const doc = db.prepare("SELECT * FROM documentos WHERE id = ?").get(req.params.id);
  if (!doc) return res.status(404).json({ error: "Documento no encontrado" });
  if (!canAccessModule(req.user, doc.modulo)) {
    return res.status(403).json({ error: "No tienes acceso a este módulo" });
  }
  const filePath = path.join(uploadsRoot, doc.ruta_archivo);
  fs.rm(filePath, { force: true }, () => {});
  db.prepare("DELETE FROM documentos WHERE id = ?").run(req.params.id);
  res.status(204).end();
});

export default router;
