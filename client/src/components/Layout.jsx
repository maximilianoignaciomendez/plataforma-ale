import { Link, NavLink, useNavigate } from "react-router-dom";
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
  const mod = MODULES[moduleKey];

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className={`app-shell theme-${mod?.theme || ""}`}>
      <header className="topbar">
        <div className="topbar-brand">
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
            SIGMAX360
            <small>Producción · Logística y Mantenimiento · SIG</small>
          </Link>
        </div>
        <div className="topbar-user">
          <span>Hola, {user?.full_name}</span>
          <span className="role-pill">{ROLE_LABEL[user?.role] || user?.role}</span>
          <button className="btn-logout" onClick={handleLogout}>Salir</button>
        </div>
      </header>
      <div className="app-body">
        {mod && (
          <nav className="sidebar">
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
        )}
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
