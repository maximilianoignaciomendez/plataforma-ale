import Layout from "../../components/Layout.jsx";
import CrudTable from "../../components/CrudTable.jsx";

const columns = [
  { key: "nombre_equipo", label: "Nombre de Equipo", type: "text", required: true },
  { key: "marca", label: "Marca", type: "text" },
  { key: "anio", label: "Año", type: "text" },
];

export default function HistorialEquipos() {
  return (
    <Layout moduleKey="logistica">
      <div className="module-header">
        <div className="module-badge">L</div>
        <div>
          <h1>Historial de Equipos</h1>
          <p>Logística y Mantenimiento</p>
        </div>
      </div>
      <CrudTable resource="historial_equipos" columns={columns} />
    </Layout>
  );
}
