import { useEffect, useState } from "react";
import Layout from "../../components/Layout.jsx";
import api from "../../api/client.js";

export default function HallazgosInspecciones() {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    api.get("/sig/hallazgos").then(({ data }) => setRows(data.rows));
  }, []);

  return (
    <Layout moduleKey="sig">
      <div className="module-header">
        <div className="module-badge">S</div>
        <div>
          <h1>Hallazgos e Inspecciones</h1>
          <p>Combina Rechazos y No Conformes (Producción) con Fallas y Averías (Logística y Mantenimiento)</p>
        </div>
      </div>
      <div className="card">
        {!rows ? (
          <div className="empty-state">Cargando...</div>
        ) : rows.length === 0 ? (
          <div className="empty-state">No hay hallazgos registrados todavía.</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Origen</th>
                <th>Detalle</th>
                <th>Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={`${r.origen}-${r.id}`}>
                  <td>{r.origen}</td>
                  <td>{r.detalle}</td>
                  <td><span className="badge warn">{r.estado}</span></td>
                  <td>{String(r.created_at || "").replace("T", " ").slice(0, 16)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}
