import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

import "./db.js";
import authRoutes from "./routes/auth.js";
import tablesRoutes from "./routes/tables.js";
import documentosRoutes from "./routes/documentos.js";
import produccionRoutes from "./routes/produccion.js";
import logisticaRoutes from "./routes/logistica.js";
import sigRoutes from "./routes/sig.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tables", tablesRoutes);
app.use("/api/documentos", documentosRoutes);
app.use("/api/produccion", produccionRoutes);
app.use("/api/logistica", logisticaRoutes);
app.use("/api/sig", sigRoutes);

app.get("/api/health", (req, res) => res.json({ ok: true }));

// Producción: si existe client/dist (generado con `npm run build` en
// client/), Express lo sirve directamente. Esto no afecta el desarrollo
// local: mientras no corras el build, esta carpeta no existe y este bloque
// no hace nada — seguís usando `npm run dev` del cliente (puerto 5173)
// exactamente como hasta ahora.
const clientDist = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "client", "dist");
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Error interno del servidor" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Plataforma Ale API escuchando en http://localhost:${PORT}`);
});
