import { pool } from "../db.js";

export const index = (req, res) => res.json({ message: "welcome to my api" });

// Endpoint de ping sense necessitat de connexió a la base de dades
export const ping = (req, res) => {
  res.json({ result: "pong" });
};

export const clients = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM clients");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving clients" });
  }
};
