import Tutorial from "../models/Tutorial";
import { CreateTutorialInput } from "../schemas/createTutorialSchema";

export const createTutorial = async (userId: number, tutorialData: CreateTutorialInput) => {
  const tutorial = await Tutorial.create(tutorialData);
  return tutorial;
};
