import Layout from "../components/Layout.jsx";
import { MODULES } from "../moduleConfig.js";

// Placeholder for Gerencia-facing modules that don't have detailed specs
// yet (Administración y Finanzas, SIG-Gerencia, RRHH). Swap this out once
// the requirements for those areas are defined.
export default function WorkInProgress({ moduleKey }) {
  const mod = MODULES[moduleKey];
  return (
    <Layout moduleKey={moduleKey}>
      <div className="module-header">
        <div className="module-badge">{mod.badge}</div>
        <div>
          <h1>{mod.title}</h1>
          <p>{mod.subtitle}</p>
        </div>
      </div>
      <div className="wip-banner">
        Este módulo está en construcción — todavía no se definieron sus secciones. Cuando tengas
        el detalle de qué debe incluir "{mod.title}", lo agregamos siguiendo el mismo patrón que
        Producción, Logística y SIG.
      </div>
    </Layout>
  );
}
