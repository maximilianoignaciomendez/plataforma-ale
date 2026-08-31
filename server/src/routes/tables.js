import { Router } from "express";
import { db, TABLE_REGISTRY, canAccessModule } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

function coerce(type, value) {
  if (type === "checkbox") return value ? 1 : 0;
  if (type === "number") return value === "" || value == null ? null : Number(value);
  return value == null ? null : String(value);
}

// node:sqlite throws a plain Error with code ERR_SQLITE_ERROR for constraint
// violations. We only ever declare foreign keys, so this always means "the
// referenced ID doesn't exist" (e.g. rechazos.orden_trabajo_id).
function isForeignKeyError(err) {
  return err?.code === "ERR_SQLITE_ERROR" && /FOREIGN KEY constraint failed/i.test(err.message);
}

router.use(requireAuth);

// router.param runs for every route on this router that declares a
// :resource segment (list/create and update/delete alike), unlike
// router.use() whose middlewares fire before route-specific params exist.
router.param("resource", (req, res, next, resource) => {
  const config = TABLE_REGISTRY[resource];
  if (!config) return res.status(404).json({ error: "Recurso no encontrado" });
  if (!canAccessModule(req.user, config.module)) {
    return res.status(403).json({ error: "No tienes acceso a este módulo" });
  }
  req.tableConfig = config;
  next();
});

router.get("/:resource", (req, res) => {
  const rows = db
    .prepare(`SELECT * FROM ${req.params.resource} ORDER BY id DESC`)
    .all();
  res.json({ rows });
});

router.post("/:resource", (req, res) => {
  const { columns } = req.tableConfig;
  const keys = Object.keys(columns);
  const values = keys.map((k) => coerce(columns[k], req.body[k]));
  const placeholders = keys.map(() => "?").join(", ");
  try {
    const stmt = db.prepare(
      `INSERT INTO ${req.params.resource} (${keys.join(", ")}, created_by) VALUES (${placeholders}, ?)`
    );
    const info = stmt.run(...values, req.user.full_name || req.user.username);
    const row = db.prepare(`SELECT * FROM ${req.params.resource} WHERE id = ?`).get(info.lastInsertRowid);
    res.status(201).json({ row });
  } catch (err) {
    if (isForeignKeyError(err)) {
      return res.status(400).json({ error: "El ID de referencia que ingresaste no existe (revisa el N° de Orden de Trabajo)." });
    }
    throw err;
  }
});

router.patch("/:resource/:id", (req, res) => {
  const { columns, touchUpdatedAt } = req.tableConfig;
  const keys = Object.keys(columns).filter((k) => k in req.body);
  if (keys.length === 0) return res.status(400).json({ error: "Nada que actualizar" });
  const setClause = keys.map((k) => `${k} = ?`).join(", ");
  const values = keys.map((k) => coerce(columns[k], req.body[k]));
  const extra = touchUpdatedAt ? ", updated_at = datetime('now')" : "";
  try {
    db.prepare(`UPDATE ${req.params.resource} SET ${setClause}${extra} WHERE id = ?`).run(
      ...values,
      req.params.id
    );
    const row = db.prepare(`SELECT * FROM ${req.params.resource} WHERE id = ?`).get(req.params.id);
    res.json({ row });
  } catch (err) {
    if (isForeignKeyError(err)) {
      return res.status(400).json({ error: "El ID de referencia que ingresaste no existe (revisa el N° de Orden de Trabajo)." });
    }
    throw err;
  }
});

router.delete("/:resource/:id", (req, res) => {
  db.prepare(`DELETE FROM ${req.params.resource} WHERE id = ?`).run(req.params.id);
  res.status(204).end();
});

export default router;
