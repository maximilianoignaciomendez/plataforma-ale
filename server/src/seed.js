import bcrypt from "bcryptjs";
import { db } from "./db.js";
import { demoUsers } from "./demoUsers.js";

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
