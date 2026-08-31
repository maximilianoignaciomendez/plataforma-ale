import Layout from "../components/Layout.jsx";
import DocumentUploader from "../components/DocumentUploader.jsx";
import { MODULES, DOCUMENT_SECTIONS } from "../moduleConfig.js";

export default function DocumentSectionPage({ moduleKey, configKey, subtipos }) {
  const mod = MODULES[moduleKey];
  const config = DOCUMENT_SECTIONS[configKey];

  return (
    <Layout moduleKey={moduleKey}>
      <div className="module-header">
        <div className="module-badge">{mod.badge}</div>
        <div>
          <h1>{config.title}</h1>
          <p>{mod.title}</p>
        </div>
      </div>
      <DocumentUploader modulo={config.modulo} seccion={config.seccion} subtipos={subtipos} />
    </Layout>
  );
}
