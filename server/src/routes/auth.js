import { Router } from "express";
import bcrypt from "bcryptjs";
import { db, ROLE_MODULES } from "../db.js";
import { signToken, requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: "Usuario y contraseña son requeridos" });
  }

  const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
  }

  const publicUser = {
    id: user.id,
    username: user.username,
    full_name: user.full_name,
    role: user.role,
    modules: ROLE_MODULES[user.role] || [],
  };

  res.json({ token: signToken(user), user: publicUser });
});

router.get("/me", requireAuth, (req, res) => {
  res.json({ user: { ...req.user, modules: ROLE_MODULES[req.user.role] || [] } });
});

export default router;
