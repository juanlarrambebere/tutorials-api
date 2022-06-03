import express from "express";
import { authHandler } from "../controllers/authController/authController";
import { validateSchema } from "../middlewares/schemaValidator";
import { userAuthSchema } from "../schemas/userAuthInputSchema";

const router = express.Router();
console.log("ROUTER", router);
router.post("/", validateSchema(userAuthSchema), authHandler);

export default router;
