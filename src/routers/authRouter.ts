import express from "express";
import { authHandler } from "../controllers/authController";

const router = express.Router();

router.post("/", authHandler); // TODO add a middleware to validate the schema.

export default router;
