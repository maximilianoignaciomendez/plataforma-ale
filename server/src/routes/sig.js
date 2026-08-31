import { Router } from "express";
import { db } from "../db.js";
import { requireAuth, requireModule } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth, requireModule("sig"));

// Hallazgos e inspecciones: agrega Rechazos y No Conformes (Producción)
// junto con Fallas y Averías (Logística y Mantenimiento).
router.get("/hallazgos", (req, res) => {
  const rechazos = db
    .prepare("SELECT id, descripcion AS detalle, estado, created_at FROM rechazos ORDER BY id DESC")
    .all()
    .map((r) => ({ ...r, origen: "Rechazos y No Conformes (Producción)" }));

  const fallas = db
    .prepare("SELECT id, texto AS detalle, estado, created_at FROM fallas_averias ORDER BY id DESC")
    .all()
    .map((r) => ({ ...r, origen: "Fallas y Averías (Logística y Mantenimiento)" }));

  const rows = [...rechazos, ...fallas].sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  res.json({ rows });
});

export default router;
