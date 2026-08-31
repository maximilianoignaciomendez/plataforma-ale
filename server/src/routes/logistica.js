import { Router } from "express";
import { db } from "../db.js";
import { requireAuth, requireModule } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth, requireModule("logistica"));

// Inventario: ligado a recepción de materiales (vista agregada por código)
router.get("/inventario", (req, res) => {
  const rows = db
    .prepare(
      `SELECT codigo,
              MAX(descripcion) AS descripcion,
              MAX(proveedor) AS proveedor,
              SUM(cantidad) AS cantidad_total,
              MAX(created_at) AS ultima_recepcion
       FROM recepcion_materiales
       GROUP BY codigo
       ORDER BY MAX(created_at) DESC`
    )
    .all();
  res.json({ rows });
});

export default router;
