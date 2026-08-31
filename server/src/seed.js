import bcrypt from "bcryptjs";
import { db } from "./db.js";

const demoUsers = [
  { username: "produccion", full_name: "Encargado de Producción", role: "produccion", password: "produccion123" },
  { username: "logistica", full_name: "Encargado de Logística y Mant.", role: "logistica", password: "logistica123" },
  { username: "sig", full_name: "Responsable SIG", role: "sig", password: "sig123" },
  { username: "adminfinanzas", full_name: "Gerencia Admin. y Finanzas", role: "admin_finanzas", password: "adminfinanzas123" },
  { username: "gerencia", full_name: "Gerencia General", role: "gerencia", password: "gerencia123" },
];

const insert = db.prepare(
  `INSERT INTO users (username, password_hash, full_name, role) VALUES (?, ?, ?, ?)
   ON CONFLICT(username) DO UPDATE SET password_hash = excluded.password_hash, full_name = excluded.full_name, role = excluded.role`
);

for (const u of demoUsers) {
  const hash = bcrypt.hashSync(u.password, 10);
  insert.run(u.username, hash, u.full_name, u.role);
}

console.log("Usuarios de prueba creados/actualizados:");
for (const u of demoUsers) {
  console.log(`  ${u.username} / ${u.password}  (rol: ${u.role})`);
}
