import { Router } from "express";
import { db } from "../db.js";
import { requireAuth, requireModule } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth, requireModule("produccion"));

// Avance de producción: barras ligadas a órdenes de trabajo y planificación diaria
router.get("/avance", (req, res) => {
  const ordenes = db.prepare("SELECT COUNT(*) AS total, SUM(completa) AS completas FROM ordenes_trabajo").get();
  const planif = db.prepare("SELECT COUNT(*) AS total, SUM(completa) AS completas FROM planificacion_diaria").get();

  const pct = (completas, total) => (total > 0 ? Math.round((completas / total) * 100) : 0);

  res.json({
    ordenes_trabajo: {
      total: ordenes.total || 0,
      completas: ordenes.completas || 0,
      porcentaje: pct(ordenes.completas || 0, ordenes.total || 0),
    },
    planificacion_diaria: {
      total: planif.total || 0,
      completas: planif.completas || 0,
      porcentaje: pct(planif.completas || 0, planif.total || 0),
    },
  });
});

export default router;
