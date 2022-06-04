import express from "express";
import { authHandler } from "../controllers/authController/authController";
import { validateSchema } from "../middlewares/schemaValidator/schemaValidator";
import { userAuthSchema } from "../schemas/userAuthInputSchema";

const router = express.Router();

router.post("/", validateSchema(userAuthSchema), authHandler);

export default router;
