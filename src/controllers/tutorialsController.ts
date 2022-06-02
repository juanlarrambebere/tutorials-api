import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors";
import { CreateTutorialInput } from "../schemas/createTutorialSchema";
import { ListTutorialsSorting } from "../schemas/listTutorialsSchema";
import { UpdateTutorialInput } from "../schemas/updateTutorialSchema";
import { createTutorial, deleteTutorial, deleteUsersTutorials, getTutorial, getTutorials, updateTutorial } from "../services/tutorialsService";

export const getTutorialHandler = async (req: Request<Record<string, string>, {}, never, {}>, res: Response, next: NextFunction) => {
  const tutorialId = parseInt(req.params.id);

  try {
    const tutorial = await getTutorial(tutorialId);
    if (!tutorial) {
      return next(new NotFoundError("Tutorial not found"));
    }

    res.status(200).json(tutorial);
  } catch (error: unknown) {
    next(error);
  }
};

export const getTutorialsHandler = async (req: Request<{}, {}, never, Record<string, string>>, res: Response, next: NextFunction) => {
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

export const updateTutorialHandler = async (req: Request<Record<string, string>, {}, UpdateTutorialInput>, res: Response, next: NextFunction) => {
  const tutorialId = parseInt(req.params.id);
  const tutorialInput = req.body;
  const { userId } = req.accessToken!;

  try {
    const tutorial = await updateTutorial(tutorialId, userId, tutorialInput);
    if (!tutorial) {
      return next(new NotFoundError("Tutorial not found"));
    }

    res.status(200).json(tutorial);
  } catch (error: unknown) {
    next(error);
  }
};

export const deleteTutorialHandler = async (req: Request<Record<string, string>, {}, never>, res: Response, next: NextFunction) => {
  const tutorialId = parseInt(req.params.id);
  const { userId } = req.accessToken!;

  try {
    const tutorial = await deleteTutorial(userId, tutorialId);
    if (!tutorial) {
      return res.status(204).send();
    }

    res.status(200).json({ tutorial });
  } catch (error: unknown) {
    next(error);
  }
};

export const deleteUsersTutorialsHandler = async (req: Request<Record<string, string>, {}, never>, res: Response, next: NextFunction) => {
  const { userId } = req.accessToken!;

  try {
    await deleteUsersTutorials(userId);

    res.status(200).json({ message: "All your tutorials were deleted" });
  } catch (error: unknown) {
    next(error);
  }
};
