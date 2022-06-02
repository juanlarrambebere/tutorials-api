import express from "express";
import {
  createTutorialHandler,
  deleteTutorialHandler,
  deleteUsersTutorialsHandler,
  getTutorialHandler,
  getTutorialsHandler,
  updateTutorialHandler,
} from "../controllers/tutorialsController";
import authenticate from "../middlewares/authentication";
import authorize from "../middlewares/authorization";
import { validateSchema } from "../middlewares/schemaValidator";
import { createTutorialSchema } from "../schemas/createTutorialSchema";
import { deleteTutorialSchema } from "../schemas/deleteTutorialSchema";
import { getTutorialSchema } from "../schemas/getTutorialSchema";
import { listTutorialsSchema } from "../schemas/listTutorialsSchema";
import { updateTutorialSchema } from "../schemas/updateTutorialSchema";

const router = express.Router();

router.use(authenticate);

router.get("/", validateSchema(listTutorialsSchema), getTutorialsHandler);

router.post("/", authorize, validateSchema(createTutorialSchema), createTutorialHandler);

router.get("/:id", validateSchema(getTutorialSchema), getTutorialHandler);

router.put("/:id", validateSchema(updateTutorialSchema), updateTutorialHandler);

router.delete("/mass_delete", deleteUsersTutorialsHandler);

router.delete("/:id", validateSchema(deleteTutorialSchema), deleteTutorialHandler);

export default router;
