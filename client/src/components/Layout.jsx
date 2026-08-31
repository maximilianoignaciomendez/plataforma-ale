import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { MODULES } from "../moduleConfig.js";
import Icon from "./icons.jsx";

const ROLE_LABEL = {
  produccion: "Producción",
  logistica: "Logística y Mant.",
  sig: "SIG",
  admin_finanzas: "Admin. y Finanzas",
  gerencia: "Gerencia",
};

export default function Layout({ moduleKey, children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const mod = MODULES[moduleKey];
  const [navOpen, setNavOpen] = useState(false);

  // Close the mobile drawer automatically whenever the route changes.
  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className={`app-shell theme-${mod?.theme || ""}`}>
      <header className="topbar">
        <div className="topbar-left">
          {mod && (
            <button
              type="button"
              className="nav-toggle"
              aria-label="Abrir menú"
              onClick={() => setNavOpen((v) => !v)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M3 5.5h14M3 10h14M3 14.5h14" />
              </svg>
            </button>
          )}
          <div className="topbar-brand">
            <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
              SIGMAX360
              <small>Producción · Logística y Mantenimiento · SIG</small>
            </Link>
          </div>
        </div>
        <div className="topbar-user">
          <span className="topbar-user-name">Hola, {user?.full_name}</span>
          <span className="role-pill">{ROLE_LABEL[user?.role] || user?.role}</span>
          <button className="btn-logout" onClick={handleLogout}>Salir</button>
        </div>
      </header>
      <div className="app-body">
        {mod && (
          <>
            {navOpen && <div className="nav-backdrop" onClick={() => setNavOpen(false)} />}
            <nav className={`sidebar ${navOpen ? "open" : ""}`}>
              <div className="sidebar-title">{mod.title}</div>
              <NavLink to={mod.basePath} end className={({ isActive }) => (isActive ? "active" : "")}>
                <Icon name="home" />
                Inicio del módulo
              </NavLink>
              {mod.sections.map((s) => (
                <NavLink
                  key={s.key}
                  to={`${mod.basePath}/${s.path}`}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <Icon name={s.key} />
                  {s.label}
                </NavLink>
              ))}
            </nav>
          </>
        )}
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
