import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { MODULES, landingModulesForRole } from "../moduleConfig.js";

// Workers with a single-module role skip the landing page and go straight
// into their module. Gerencia (and, trivially, admin_finanzas) see a hub of
// the modules they have access to.
export default function Home() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  const moduleKeys = landingModulesForRole(user.role);
  if (moduleKeys.length === 1) {
    return <Navigate to={MODULES[moduleKeys[0]].basePath} replace />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", padding: "48px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", width: "100%" }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.01em" }}>
            SigMax360
          </h1>
          <p style={{ margin: "4px 0 0", color: "var(--ink-soft)" }}>
            Hola {user.full_name} — selecciona un módulo
          </p>
        </div>
        <div className="landing-grid">
          {moduleKeys.map((key) => {
            const mod = MODULES[key];
            return (
              <Link
                key={key}
                to={mod.basePath}
                className={`landing-card theme-${mod.theme}`}
                style={{ background: `var(--accent)` }}
              >
                <h3>{mod.title}</h3>
                <span>{mod.subtitle}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
