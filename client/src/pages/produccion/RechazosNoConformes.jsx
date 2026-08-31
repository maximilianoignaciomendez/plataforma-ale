import Layout from "../../components/Layout.jsx";
import CrudTable from "../../components/CrudTable.jsx";

const columns = [
  { key: "descripcion", label: "Descripción", type: "text", required: true },
  { key: "orden_trabajo_id", label: "ID Orden de Trabajo", type: "number" },
  { key: "estado", label: "Estado", type: "text" },
];

export default function RechazosNoConformes() {
  return (
    <Layout moduleKey="produccion">
      <div className="module-header">
        <div className="module-badge">P</div>
        <div>
          <h1>Rechazos / No Conformes</h1>
          <p>Producción — alimenta Hallazgos e Inspecciones en SIG</p>
        </div>
      </div>
      <CrudTable resource="rechazos" columns={columns} emptyMessage="No hay rechazos registrados." />
    </Layout>
  );
}
