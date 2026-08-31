import Layout from "../../components/Layout.jsx";
import CrudTable from "../../components/CrudTable.jsx";

const columns = [
  { key: "cliente", label: "Nombre del Cliente", type: "text", required: true },
  { key: "numero_orden_compra", label: "N° Orden de Compra", type: "text", required: true },
  { key: "cantidad_insumos", label: "Cantidad de Insumos", type: "number", required: true },
  { key: "completa", label: "Completa", type: "checkbox" },
];

export default function OrdenesTrabajo() {
  return (
    <Layout moduleKey="produccion">
      <div className="module-header">
        <div className="module-badge">P</div>
        <div>
          <h1>Órdenes de Trabajo</h1>
          <p>Producción</p>
        </div>
      </div>
      <CrudTable resource="ordenes_trabajo" columns={columns} />
    </Layout>
  );
}
