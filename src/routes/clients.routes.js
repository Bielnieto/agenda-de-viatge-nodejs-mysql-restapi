import { Router } from "express";
import { createClient, getClients, getClientById, getClientsByDestination, updateClient, deleteClient } from "../controllers/clients.controller.js";

const router = Router();

// Crear un nou client
router.post("/clients", createClient);

// Obtenir tots els clients o cercar per destí de viatge
router.get("/clients", (req, res, next) => {
  if (req.query.destination) {
    return getClientsByDestination(req, res, next);
  }
  return getClients(req, res, next);
});

// Obtenir un client per ID
router.get("/clients/:id", getClientById);

// Actualitzar un client existent
router.put("/clients/:id", updateClient);

// Eliminar un client
router.delete("/clients/:id", deleteClient);

export default router;
