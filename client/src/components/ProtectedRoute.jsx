import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const MODULE_ACCESS = {
  produccion: ["produccion", "gerencia"],
  logistica: ["logistica", "gerencia"],
  sig: ["sig", "gerencia"],
  sig_gerencia: ["gerencia"],
  rrhh: ["gerencia"],
  admin_finanzas: ["admin_finanzas"],
  gerencia: ["gerencia"],
};

export default function ProtectedRoute({ module, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!module) return children; // any authenticated user (e.g. the landing page)
  const allowedRoles = MODULE_ACCESS[module] || [];
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
}
