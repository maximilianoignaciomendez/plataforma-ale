import { useEffect, useState } from "react";
import Layout from "../../components/Layout.jsx";
import ProgressBar from "../../components/ProgressBar.jsx";
import api from "../../api/client.js";

export default function AvanceProduccion() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/produccion/avance").then(({ data }) => setData(data));
  }, []);

  return (
    <Layout moduleKey="produccion">
      <div className="module-header">
        <div className="module-badge">P</div>
        <div>
          <h1>Avance de Producción</h1>
          <p>Indicadores ligados a Órdenes de Trabajo y Planificación Diaria</p>
        </div>
      </div>

      <div className="card">
        {!data ? (
          <div className="empty-state">Cargando indicadores...</div>
        ) : (
          <>
            <ProgressBar
              label="Órdenes de trabajo completas"
              value={data.ordenes_trabajo.porcentaje}
              detail={`${data.ordenes_trabajo.completas} de ${data.ordenes_trabajo.total}`}
            />
            <ProgressBar
              label="Planificación diaria completa"
              value={data.planificacion_diaria.porcentaje}
              detail={`${data.planificacion_diaria.completas} de ${data.planificacion_diaria.total}`}
            />
          </>
        )}
      </div>
    </Layout>
  );
}
