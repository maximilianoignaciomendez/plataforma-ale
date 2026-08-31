import Layout from "../../components/Layout.jsx";
import CrudTable from "../../components/CrudTable.jsx";

const columns = [
  { key: "nombre", label: "Nombre", type: "text", required: true },
  { key: "marca", label: "Marca", type: "text" },
  { key: "descripcion", label: "Descripción", type: "text" },
  { key: "cantidad", label: "Cantidad", type: "number" },
];

export default function RepuestosConsumibles() {
  return (
    <Layout moduleKey="logistica">
      <div className="module-header">
        <div className="module-badge">L</div>
        <div>
          <h1>Repuestos y Consumibles</h1>
          <p>Logística y Mantenimiento</p>
        </div>
      </div>
      <CrudTable resource="repuestos_consumibles" columns={columns} />
    </Layout>
  );
}
