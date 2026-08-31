import Layout from "../../components/Layout.jsx";
import CrudTable from "../../components/CrudTable.jsx";

const columns = [
  { key: "codigo", label: "Código", type: "text", required: true },
  { key: "descripcion", label: "Descripción", type: "text", required: true },
  { key: "cantidad", label: "Cantidad", type: "number", required: true },
  { key: "proveedor", label: "Proveedor", type: "text" },
];

export default function RecepcionMateriales() {
  return (
    <Layout moduleKey="logistica">
      <div className="module-header">
        <div className="module-badge">L</div>
        <div>
          <h1>Recepción de Materiales</h1>
          <p>Logística y Mantenimiento</p>
        </div>
      </div>
      <CrudTable resource="recepcion_materiales" columns={columns} />
    </Layout>
  );
}
