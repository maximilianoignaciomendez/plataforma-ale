// Minimal line-icon set for sidebar nav and hub tiles, one per section key
// across every module. Kept as inline SVG (no icon font dependency) in a
// single small, consistent style: 20x20, stroke-based, rounded caps.
const PATHS = {
  home: <><rect x="3" y="3" width="6" height="6" rx="1.3" /><rect x="11" y="3" width="6" height="6" rx="1.3" /><rect x="3" y="11" width="6" height="6" rx="1.3" /><rect x="11" y="11" width="6" height="6" rx="1.3" /></>,

  // Producción
  ordenes: <><rect x="4" y="3" width="12" height="15" rx="1.5" /><path d="M7 3V2h6v1M7 8h6M7 11h6M7 14h3" /></>,
  planificacion: <><rect x="3" y="4" width="14" height="13" rx="1.5" /><path d="M3 8h14M6.5 2.5v3M13.5 2.5v3" /></>,
  avance: <path d="M3 17V9M9 17V3M15 17v-6" />,
  procedimientos: <><path d="M4 3h9l3 3v11H4z" /><path d="M13 3v3h3M7 10h6M7 13h6" /></>,
  rechazos: <><path d="M10 2 2 17h16z" /><path d="M10 8v4" /><circle cx="10" cy="14.2" r=".4" fill="currentColor" /></>,
  incidentes: <><path d="M5 17V3" /><path d="M5 4h9l-2.5 3L14 10H5" /></>,
  tareas: <><rect x="3" y="3" width="14" height="14" rx="2.5" /><path d="M6.5 10l2.3 2.3L14 7.5" /></>,

  // Logística y Mantenimiento
  recepcion: <><path d="M3 8V4h14v4" /><path d="M3 8h14v9H3z" /><path d="M8 8v3l2 1.5 2-1.5V8" /></>,
  inventario: <><path d="M10 2 3 5.5 10 9l7-3.5z" /><path d="M3 5.5V14l7 3.5M17 5.5V14l-7 3.5M10 9v8.5" /></>,
  despachos: <><rect x="2" y="6" width="10" height="8" rx="1" /><path d="M12 9h3l3 3v2h-6z" /><circle cx="6" cy="15.5" r="1.4" /><circle cx="14.5" cy="15.5" r="1.4" /></>,
  trazabilidad: <><circle cx="5" cy="5" r="2" /><circle cx="15" cy="5" r="2" /><circle cx="10" cy="15" r="2" /><path d="M6.6 6.4 8.6 13M13.4 6.4 11.4 13" /></>,
  "mant-prev": <path d="M15.5 4.5a3 3 0 0 1-3.9 3.9L5 15l-2-2 6.6-6.6a3 3 0 0 1 3.9-3.9l-2 2 1.4 1.4 2-2z" />,
  "mant-corr": <><path d="M15.5 4.5a3 3 0 0 1-3.9 3.9L5 15l-2-2 6.6-6.6a3 3 0 0 1 3.9-3.9l-2 2 1.4 1.4 2-2z" /><path d="M13 13l3 3" /></>,
  fallas: <><path d="M10 2 2 6v8l8 4 8-4V6z" /><path d="M10 7v4" /><circle cx="10" cy="13.5" r=".4" fill="currentColor" /></>,
  equipos: <><circle cx="10" cy="10" r="2.5" /><path d="M10 3v2M10 15v2M3 10h2M15 10h2M5.3 5.3l1.4 1.4M13.3 13.3l1.4 1.4M14.7 5.3l-1.4 1.4M6.7 13.3l-1.4 1.4" /></>,
  repuestos: <><path d="M10 2 3 5.5v9L10 18l7-3.5v-9z" /><path d="M3 5.5 10 9l7-3.5M10 9v9" /></>,

  // SIG
  vigentes: <><path d="M4 3h9l3 3v11H4z" /><path d="M13 3v3h3" /><path d="M7.5 11l1.5 1.5 3.5-3.5" /></>,
  registros: <><rect x="3" y="3" width="14" height="4" rx="1" /><rect x="3" y="9" width="14" height="4" rx="1" /><path d="M6 15h8" /></>,
  matrices: <><rect x="3" y="3" width="14" height="14" rx="1.5" /><path d="M3 8.3h14M3 13h14M8.3 3v14M13 3v14" /></>,
  hallazgos: <><circle cx="8.5" cy="8.5" r="5.5" /><path d="M16.5 16.5 13 13" /></>,
  "no-conformidades": <><circle cx="10" cy="10" r="7" /><path d="M7.3 7.3l5.4 5.4M12.7 7.3l-5.4 5.4" /></>,
  acciones: <><circle cx="10" cy="10" r="7" /><path d="M6.7 10.2l2.3 2.3 4.3-4.6" /></>,
  capacitaciones: <><path d="M2 7.5 10 4l8 3.5-8 3.5z" /><path d="M5 9.3v3.8c0 1 2.2 2.4 5 2.4s5-1.4 5-2.4V9.3" /></>,
  indicadores: <><path d="M3 17V9M9 17V3M15 17v-6" /></>,
  ambiental: <><path d="M10 17c-4-2-6-5.5-6-9.5C4 4 6.5 3 10 3s6 1 6 4.5c0 4-2 7.5-6 9.5z" /><path d="M10 7v7" /></>,
};

export default function Icon({ name, size = 17 }) {
  const body = PATHS[name] || PATHS.home;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {body}
    </svg>
  );
}
