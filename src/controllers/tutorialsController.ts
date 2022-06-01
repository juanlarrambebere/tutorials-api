import { NextFunction, Request, Response } from "express";
import { CreateTutorialInput } from "../schemas/createTutorialSchema";
import { createTutorial } from "../services/tutorialsService";

export const createTutorialHandler = async (req: Request<{}, {}, CreateTutorialInput>, res: Response, next: NextFunction) => {
  const tutorialInput = req.body;
  const { userId } = req.accessToken!;

  try {
    const tutorial = await createTutorial(userId, tutorialInput);
    res.status(201).json(tutorial);
  } catch (error: unknown) {
    next(error);
  }
};
