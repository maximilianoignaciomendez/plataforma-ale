import Layout from "../../components/Layout.jsx";
import CrudTable from "../../components/CrudTable.jsx";

const columns = [
  { key: "texto", label: "Descripción del incidente", type: "textarea", rows: 6, required: true },
];

export default function ReportarIncidente() {
  return (
    <Layout moduleKey="produccion">
      <div className="module-header">
        <div className="module-badge">P</div>
        <div>
          <h1>Reportar Incidente</h1>
          <p>Producción</p>
        </div>
      </div>
      <CrudTable resource="incidentes" columns={columns} emptyMessage="No hay incidentes reportados." />
    </Layout>
  );
}
