import { NextFunction, Request, Response } from "express";
import { CreateTutorialInput } from "../schemas/createTutorialSchema";
import { ListTutorialsSorting } from "../schemas/listTutorialsSchema";
import { createTutorial, getTutorials } from "../services/tutorialsService";

export const getTutorialsHandler = async (req: Request<{}, {}, never, { [paramName: string]: string | undefined }>, res: Response, next: NextFunction) => {
  const filters = {
    title: req.query.title,
    description: req.query.description,
  };

  const paging = {
    offset: req.query.offset ? parseInt(req.query.offset) : undefined,
    limit: req.query.limit ? parseInt(req.query.limit) : undefined,
  };

  const sorting = {
    sortBy: req.query.sortBy,
  } as ListTutorialsSorting;

  try {
    const tutorials = await getTutorials(filters, paging, sorting);
    res.status(200).json(tutorials);
  } catch (error: unknown) {
    next(error);
  }
};

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
