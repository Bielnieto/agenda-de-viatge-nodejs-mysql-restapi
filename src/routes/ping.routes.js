import { Router } from "express";
import { ping } from "../controllers/index.rotes.js";

const router = Router();

// Endpoint de prova GET /api/ping
router.get("/ping", ping);

export default router;
