import { useEffect, useState } from "react";
import Layout from "../../components/Layout.jsx";
import api from "../../api/client.js";

export default function Inventario() {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    api.get("/logistica/inventario").then(({ data }) => setRows(data.rows));
  }, []);

  return (
    <Layout moduleKey="logistica">
      <div className="module-header">
        <div className="module-badge">L</div>
        <div>
          <h1>Inventario</h1>
          <p>Ligado a Recepción de Materiales (vista agregada por código)</p>
        </div>
      </div>
      <div className="card">
        {!rows ? (
          <div className="empty-state">Cargando...</div>
        ) : rows.length === 0 ? (
          <div className="empty-state">Aún no hay materiales recepcionados.</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Descripción</th>
                <th>Proveedor</th>
                <th>Cantidad total</th>
                <th>Última recepción</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.codigo}>
                  <td>{r.codigo}</td>
                  <td>{r.descripcion}</td>
                  <td>{r.proveedor}</td>
                  <td>{r.cantidad_total}</td>
                  <td>{String(r.ultima_recepcion || "").replace("T", " ").slice(0, 16)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}
