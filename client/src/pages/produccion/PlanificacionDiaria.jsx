import Layout from "../../components/Layout.jsx";
import DocumentUploader from "../../components/DocumentUploader.jsx";
import CrudTable from "../../components/CrudTable.jsx";

const columns = [
  { key: "nombre_documento", label: "Documento / ID", type: "text", required: true },
  { key: "control_calidad", label: "Control de Calidad", type: "checkbox" },
  { key: "fecha_entrega", label: "Fecha de Entrega", type: "date" },
  { key: "completa", label: "Completa", type: "checkbox" },
];

export default function PlanificacionDiaria() {
  return (
    <Layout moduleKey="produccion">
      <div className="module-header">
        <div className="module-badge">P</div>
        <div>
          <h1>Planificación Diaria</h1>
          <p>Producción</p>
        </div>
      </div>

      <div className="section-title">Ingreso de documentos</div>
      <DocumentUploader modulo="produccion" seccion="planificacion_diaria" />

      <div className="section-title">Control por documento</div>
      <CrudTable resource="planificacion_diaria" columns={columns} />
    </Layout>
  );
}
