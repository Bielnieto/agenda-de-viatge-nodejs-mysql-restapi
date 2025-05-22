import { pool } from "../db.js";

export const index = (req, res) => res.json({ message: "welcome to my api" });

// Endpoint de ping sense necessitat de connexió a la base de dades
export const ping = (req, res) => {
  res.json({ result: "pong" });
};
