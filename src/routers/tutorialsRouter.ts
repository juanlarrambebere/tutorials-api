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
import { validateSchema } from "../middlewares/schemaValidator/schemaValidator";
import { createTutorialSchema } from "../schemas/createTutorialSchema/createTutorialSchema";
import { deleteTutorialSchema } from "../schemas/deleteTutorialSchema/deleteTutorialSchema";
import { getTutorialSchema } from "../schemas/getTutorialSchema";
import { listTutorialsSchema } from "../schemas/listTutorialsSchema";
import { updateTutorialSchema } from "../schemas/updateTutorialSchema";

const router = express.Router();

router.use(authenticate);

router.get("/", authorize, validateSchema(listTutorialsSchema), getTutorialsHandler);

router.post("/", authorize, validateSchema(createTutorialSchema), createTutorialHandler);

router.get("/:id", authorize, validateSchema(getTutorialSchema), getTutorialHandler);

router.put("/:id", authorize, validateSchema(updateTutorialSchema), updateTutorialHandler);

router.delete("/mass_delete", authorize, deleteUsersTutorialsHandler);

router.delete("/:id", authorize, validateSchema(deleteTutorialSchema), deleteTutorialHandler);

export default router;
