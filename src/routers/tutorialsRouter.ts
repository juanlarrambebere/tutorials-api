import express, { NextFunction, Request, Response } from "express";
import { createTutorialHandler, getTutorialHandler, getTutorialsHandler } from "../controllers/tutorialsController";
import authenticate from "../middlewares/authentication";
import authorize from "../middlewares/authorization";
import { validateSchema } from "../middlewares/schemaValidator";
import { createTutorialSchema } from "../schemas/createTutorialSchema";
import { getTutorialSchema } from "../schemas/getTutorialSchema";
import { listTutorialsSchema } from "../schemas/listTutorialsSchema";

const router = express.Router();

router.use(authenticate);

router.get("/", validateSchema(listTutorialsSchema), getTutorialsHandler);

router.post("/", authorize, validateSchema(createTutorialSchema), createTutorialHandler);

router.get("/:id", validateSchema(getTutorialSchema), getTutorialHandler);

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: "Not implemented yet" });
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: "Not implemented yet" });
});

router.delete("/mass_delete", async (req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: "Not implemented yet" });
});

export default router;
