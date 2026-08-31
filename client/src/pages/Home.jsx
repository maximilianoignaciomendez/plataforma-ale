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
    <div className="login-screen" style={{ alignItems: "flex-start", padding: "48px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", width: "100%" }}>
        <div style={{ color: "#fff", marginBottom: 24 }}>
          <h1 style={{ margin: 0 }}>Plataforma Ale</h1>
          <p style={{ opacity: 0.8 }}>Hola {user.full_name} — selecciona un módulo</p>
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
