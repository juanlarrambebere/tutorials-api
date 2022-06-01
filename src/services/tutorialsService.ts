import Tutorial from "../models/Tutorial";
import { CreateTutorialInput } from "../schemas/createTutorialSchema";

export const createTutorial = async (userId: number, tutorialData: CreateTutorialInput) => {
  return await Tutorial.create({ userId, ...tutorialData });
};
