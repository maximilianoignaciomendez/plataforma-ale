import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import { MODULES } from "../moduleConfig.js";

export default function ModuleHub({ moduleKey }) {
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
      <div className="hub-grid">
        {mod.sections.map((s) => (
          <Link key={s.key} to={`${mod.basePath}/${s.path}`} className="hub-tile">
            <div className="icon">{s.label.charAt(0)}</div>
            <div className="tile-title">{s.label}</div>
            <div className="tile-desc">{s.desc}</div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
