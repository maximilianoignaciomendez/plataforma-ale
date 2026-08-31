import Layout from "../../components/Layout.jsx";
import CrudTable from "../../components/CrudTable.jsx";

const columns = [
  { key: "texto", label: "Tarea", type: "text", required: true },
  { key: "estado", label: "Estado (pendiente / seguimiento / cerrada)", type: "text" },
];

export default function TareasPendientes() {
  return (
    <Layout moduleKey="produccion">
      <div className="module-header">
        <div className="module-badge">P</div>
        <div>
          <h1>Tareas Pendientes</h1>
          <p>Seguimiento y cierre</p>
        </div>
      </div>
      <CrudTable resource="tareas_pendientes" columns={columns} emptyMessage="No hay tareas pendientes." />
    </Layout>
  );
}
