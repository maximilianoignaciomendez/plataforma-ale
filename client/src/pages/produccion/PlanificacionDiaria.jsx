import { useEffect, useState } from "react";
import Layout from "../../components/Layout.jsx";
import DocumentUploader from "../../components/DocumentUploader.jsx";
import CrudTable from "../../components/CrudTable.jsx";
import Collapsible from "../../components/Collapsible.jsx";
import api from "../../api/client.js";

export default function PlanificacionDiaria() {
  // "Documento / ID" en la tabla de abajo hace referencia al id de un
  // archivo subido en "Ingreso de documentos". En vez de pedir la
  // descripción de nuevo, la buscamos por ese id y la mostramos de solo
  // lectura, tal como se cargó en el documento.
  const [docsById, setDocsById] = useState({});

  useEffect(() => {
    api
      .get("/documentos", { params: { modulo: "produccion", seccion: "planificacion_diaria" } })
      .then(({ data }) => {
        const map = {};
        data.rows.forEach((doc) => {
          map[doc.id] = doc.descripcion;
        });
        setDocsById(map);
      });
  }, []);

  const columns = [
    { key: "nombre_documento", label: "Documento / ID", type: "text", required: true },
    {
      key: "descripcion_doc",
      label: "Descripción",
      type: "computed",
      render: (row) => docsById[row.nombre_documento] || "-",
    },
    { key: "fecha_entrega", label: "Fecha de Entrega", type: "date" },
    { key: "completa", label: "Completa", type: "checkbox" },
    { key: "control_calidad", label: "Control de Calidad", type: "checkbox" },
  ];

  return (
    <Layout moduleKey="produccion">
      <div className="module-header">
        <div className="module-badge">P</div>
        <div>
          <h1>Planificación Diaria</h1>
          <p>Producción</p>
        </div>
      </div>

      <Collapsible title="Ingreso de documentos">
        <DocumentUploader modulo="produccion" seccion="planificacion_diaria" />
      </Collapsible>

      <div className="section-title">Control por documento</div>
      <CrudTable resource="planificacion_diaria" columns={columns} showCreatedBy={false} />
    </Layout>
  );
}
