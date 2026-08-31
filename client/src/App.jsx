import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import ModuleHub from "./pages/ModuleHub.jsx";
import DocumentSectionPage from "./pages/DocumentSectionPage.jsx";
import WorkInProgress from "./pages/WorkInProgress.jsx";

import OrdenesTrabajo from "./pages/produccion/OrdenesTrabajo.jsx";
import PlanificacionDiaria from "./pages/produccion/PlanificacionDiaria.jsx";
import AvanceProduccion from "./pages/produccion/AvanceProduccion.jsx";
import ReportarIncidente from "./pages/produccion/ReportarIncidente.jsx";
import TareasPendientes from "./pages/produccion/TareasPendientes.jsx";
import RechazosNoConformes from "./pages/produccion/RechazosNoConformes.jsx";

import RecepcionMateriales from "./pages/logistica/RecepcionMateriales.jsx";
import Inventario from "./pages/logistica/Inventario.jsx";
import Trazabilidad from "./pages/logistica/Trazabilidad.jsx";
import FallasAverias from "./pages/logistica/FallasAverias.jsx";
import HistorialEquipos from "./pages/logistica/HistorialEquipos.jsx";
import RepuestosConsumibles from "./pages/logistica/RepuestosConsumibles.jsx";

import HallazgosInspecciones from "./pages/sig/HallazgosInspecciones.jsx";

function P({ module, children }) {
  return <ProtectedRoute module={module}>{children}</ProtectedRoute>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<P><Home /></P>} />

      {/* Producción ------------------------------------------------ */}
      <Route path="/produccion" element={<P module="produccion"><ModuleHub moduleKey="produccion" /></P>} />
      <Route path="/produccion/ordenes-trabajo" element={<P module="produccion"><OrdenesTrabajo /></P>} />
      <Route path="/produccion/planificacion-diaria" element={<P module="produccion"><PlanificacionDiaria /></P>} />
      <Route path="/produccion/avance-produccion" element={<P module="produccion"><AvanceProduccion /></P>} />
      <Route
        path="/produccion/procedimientos"
        element={<P module="produccion"><DocumentSectionPage moduleKey="produccion" configKey="produccion/procedimientos" /></P>}
      />
      <Route path="/produccion/rechazos-no-conformes" element={<P module="produccion"><RechazosNoConformes /></P>} />
      <Route path="/produccion/reportar-incidente" element={<P module="produccion"><ReportarIncidente /></P>} />
      <Route path="/produccion/tareas-pendientes" element={<P module="produccion"><TareasPendientes /></P>} />

      {/* Logística y Mantenimiento ---------------------------------- */}
      <Route path="/logistica" element={<P module="logistica"><ModuleHub moduleKey="logistica" /></P>} />
      <Route path="/logistica/recepcion-materiales" element={<P module="logistica"><RecepcionMateriales /></P>} />
      <Route path="/logistica/inventario" element={<P module="logistica"><Inventario /></P>} />
      <Route
        path="/logistica/guia-despachos"
        element={<P module="logistica"><DocumentSectionPage moduleKey="logistica" configKey="logistica/despachos" /></P>}
      />
      <Route path="/logistica/trazabilidad" element={<P module="logistica"><Trazabilidad /></P>} />
      <Route
        path="/logistica/mantenimiento-preventivo"
        element={<P module="logistica"><DocumentSectionPage moduleKey="logistica" configKey="logistica/mant-prev" /></P>}
      />
      <Route
        path="/logistica/mantenimiento-correctivo"
        element={<P module="logistica"><DocumentSectionPage moduleKey="logistica" configKey="logistica/mant-corr" /></P>}
      />
      <Route path="/logistica/fallas-averias" element={<P module="logistica"><FallasAverias /></P>} />
      <Route path="/logistica/historial-equipos" element={<P module="logistica"><HistorialEquipos /></P>} />
      <Route path="/logistica/repuestos-consumibles" element={<P module="logistica"><RepuestosConsumibles /></P>} />

      {/* SIG ----------------------------------------------------------- */}
      <Route path="/sig" element={<P module="sig"><ModuleHub moduleKey="sig" /></P>} />
      <Route
        path="/sig/documentos-vigentes"
        element={<P module="sig"><DocumentSectionPage moduleKey="sig" configKey="sig/vigentes" /></P>}
      />
      <Route
        path="/sig/registros"
        element={<P module="sig"><DocumentSectionPage moduleKey="sig" configKey="sig/registros" /></P>}
      />
      <Route
        path="/sig/matrices"
        element={<P module="sig"><DocumentSectionPage moduleKey="sig" configKey="sig/matrices" /></P>}
      />
      <Route path="/sig/hallazgos-inspecciones" element={<P module="sig"><HallazgosInspecciones /></P>} />
      <Route
        path="/sig/no-conformidades"
        element={<P module="sig"><DocumentSectionPage moduleKey="sig" configKey="sig/no-conformidades" /></P>}
      />
      <Route
        path="/sig/acciones-correctivas"
        element={<P module="sig"><DocumentSectionPage moduleKey="sig" configKey="sig/acciones" /></P>}
      />
      <Route
        path="/sig/capacitaciones"
        element={<P module="sig"><DocumentSectionPage moduleKey="sig" configKey="sig/capacitaciones" /></P>}
      />
      <Route
        path="/sig/indicadores-reportes"
        element={<P module="sig"><DocumentSectionPage moduleKey="sig" configKey="sig/indicadores" /></P>}
      />
      <Route
        path="/sig/aspectos-ambientales-sst"
        element={<P module="sig"><DocumentSectionPage moduleKey="sig" configKey="sig/ambiental" /></P>}
      />

      {/* Gerencia (en construcción) ------------------------------------ */}
      <Route path="/admin-finanzas" element={<P module="admin_finanzas"><WorkInProgress moduleKey="admin_finanzas" /></P>} />
      <Route path="/sig-gerencia" element={<P module="sig_gerencia"><WorkInProgress moduleKey="sig_gerencia" /></P>} />
      <Route path="/rrhh" element={<P module="rrhh"><WorkInProgress moduleKey="rrhh" /></P>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
