# Plataforma Ale

Plataforma web para los módulos de **Producción**, **Logística y Mantenimiento**,
**SIG** (Sistema Integrado de Gestión), y (en construcción) **Gerencia**
(Administración y Finanzas, SIG-Gerencia, Recursos Humanos), basada en el
documento `Sistema Ale Especificaciones.docx`.

Cada trabajador inicia sesión y ve **únicamente** el módulo correspondiente a
su rol. Gerencia inicia sesión y ve todos los módulos operativos (Producción,
Logística, SIG) más SIG-Gerencia y RRHH. La Gerencia de Administración y
Finanzas tiene su propio módulo exclusivo, separado del resto.

## Estructura del proyecto

```
plataforma-ale/
  server/   API REST (Node.js + Express + SQLite)
  client/   Interfaz web (React + Vite)
```

## Requisitos

- Node.js 18 o superior

## Puesta en marcha

### 1. Backend

```bash
cd server
npm install
cp .env.example .env
npm run seed   # crea los usuarios de prueba
npm run dev    # http://localhost:4000
```

### 2. Frontend

En otra terminal:

```bash
cd client
npm install
npm run dev    # http://localhost:5173
```

Abre `http://localhost:5173` en el navegador. El frontend redirige las
peticiones `/api/*` al backend (puerto 4000) mediante el proxy de Vite.

## Usuarios de prueba (creados por `npm run seed`)

| Usuario         | Contraseña          | Rol / Módulo                          |
|-----------------|----------------------|----------------------------------------|
| `produccion`    | `produccion123`      | Producción                             |
| `logistica`     | `logistica123`       | Logística y Mantenimiento              |
| `sig`           | `sig123`              | SIG                                    |
| `adminfinanzas` | `adminfinanzas123`   | Administración y Finanzas (Gerencia)   |
| `gerencia`      | `gerencia123`         | Gerencia general (ve todos los módulos)|

Cambia estas contraseñas antes de usar la plataforma en producción, y crea
usuarios reales directamente en la tabla `users` de `server/data.sqlite`
(o agrega una pantalla de administración de usuarios más adelante).

## Qué incluye cada módulo

### Producción
- Órdenes de Trabajo (tabla: cliente, N° OC, cantidad de insumos, completa)
- Planificación Diaria (carga de documentos + tabla de control de calidad/fecha de entrega/completa)
- Avance de Producción (barras de progreso ligadas a Órdenes de Trabajo y Planificación Diaria)
- Procedimientos e Instructivos (carga de documentos)
- Rechazos / No Conformes (tabla — alimenta Hallazgos e Inspecciones de SIG)
- Reportar Incidente (texto)
- Tareas Pendientes (texto + seguimiento/cierre)

### Logística y Mantenimiento
- Recepción de Materiales (tabla: código, descripción, cantidad, proveedor)
- Inventario (vista ligada/derivada de Recepción de Materiales)
- Guía de Despachos (carga de documentos)
- Trazabilidad (carga de documentos por tipo: Cotización, Orden de Compra, Guía de Despacho, Factura)
- Mantenimiento Preventivo (carga de documentos)
- Mantenimiento Correctivo (carga de documentos)
- Fallas y Averías (texto + observación — alimenta Hallazgos e Inspecciones de SIG)
- Historial de Equipos (tabla: nombre, marca, año)
- Repuestos y Consumibles (tabla: nombre, marca, descripción, cantidad)

### SIG
- Documentos Vigentes, Registros, Matrices (carga de documentos)
- Hallazgos e Inspecciones (vista agregada de Rechazos y de Fallas/Averías)
- No Conformidades, Acciones Correctivas, Capacitaciones, Indicadores y
  Reportes, Aspectos Ambientales y SST (carga de documentos)

### Gerencia — en construcción
- Administración y Finanzas (exclusivo de esa gerencia)
- SIG (Gerencia) — SIG con agregados de gerencia
- Recursos Humanos

Estas tres secciones están dejadas como placeholders ("en construcción") a
la espera de la definición detallada de sus campos, siguiendo el mismo
patrón (tablas / documentos / vistas ligadas) que el resto de la plataforma.

## Arquitectura técnica

- **Backend**: Express + SQLite (módulo nativo `node:sqlite` de Node.js 22.5+,
  un solo archivo `data.sqlite`, sin dependencias nativas que compilar ni
  motor de base de datos aparte que instalar). Autenticación
  con JWT. Subida de archivos con `multer`, almacenados en `server/uploads/`
  organizados por módulo/sección.
- **Control de acceso**: cada usuario tiene un `role` que determina a qué
  módulos puede entrar (`server/src/db.js` → `ROLE_MODULES`, replicado en el
  frontend en `client/src/components/ProtectedRoute.jsx`). Todas las rutas
  de la API validan el módulo contra el rol del usuario autenticado.
- **Frontend**: React + Vite, sin librería de UI externa (CSS propio en
  `client/src/index.css`, con theming por color según el módulo). Las
  secciones de "carga de documentos" y las tablas CRUD simples están
  implementadas como componentes genéricos (`CrudTable`, `DocumentUploader`,
  `DocumentSectionPage`) configurados por `client/src/moduleConfig.js`, para
  poder agregar nuevas secciones sin duplicar código.

## Próximos pasos sugeridos

- Definir y construir los módulos de Gerencia (Administración y Finanzas,
  SIG-Gerencia, RRHH).
- Pantalla de administración de usuarios (alta/baja, reseteo de contraseña).
- Migrar de SQLite a Postgres/MySQL si se necesita despliegue multi-servidor.
- Notificaciones (p. ej. tareas pendientes o mantenimientos próximos).
