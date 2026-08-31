import Layout from "../../components/Layout.jsx";
import DocumentUploader from "../../components/DocumentUploader.jsx";

const subtipos = ["Cotización", "Orden de Compra", "Guía Despacho", "Factura"];

export default function Trazabilidad() {
  return (
    <Layout moduleKey="logistica">
      <div className="module-header">
        <div className="module-badge">L</div>
        <div>
          <h1>Trazabilidad</h1>
          <p>Carga documental por tipo: Cotización, Orden de Compra, Guía de Despacho, Factura</p>
        </div>
      </div>
      <DocumentUploader modulo="logistica" seccion="trazabilidad" subtipos={subtipos} />
    </Layout>
  );
}
