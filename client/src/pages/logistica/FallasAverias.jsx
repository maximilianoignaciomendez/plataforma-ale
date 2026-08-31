import Layout from "../../components/Layout.jsx";
import CrudTable from "../../components/CrudTable.jsx";

const columns = [
  { key: "texto", label: "Falla / Avería", type: "text", required: true },
  { key: "observacion", label: "Observación", type: "text" },
  { key: "estado", label: "Estado", type: "text" },
];

export default function FallasAverias() {
  return (
    <Layout moduleKey="logistica">
      <div className="module-header">
        <div className="module-badge">L</div>
        <div>
          <h1>Fallas y Averías</h1>
          <p>Logística y Mantenimiento — alimenta Hallazgos e Inspecciones en SIG</p>
        </div>
      </div>
      <CrudTable resource="fallas_averias" columns={columns} emptyMessage="No hay fallas registradas." />
    </Layout>
  );
}
