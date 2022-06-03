import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { ForbiddenError } from "../errors";
import Tutorial from "../models/Tutorial";
import { CreateTutorialInput } from "../schemas/createTutorialSchema/createTutorialSchema";
import { ListTutorialsFilters, ListTutorialsPaging, ListTutorialsSorting } from "../schemas/listTutorialsSchema";
import { UpdateTutorialInput } from "../schemas/updateTutorialSchema";

export const MAX_LIMIT = 200;
const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 50;

export const getTutorial = async (id: number) => {
  return await Tutorial.findByPk(id);
};

export const getTutorials = async (filters: ListTutorialsFilters, paging: ListTutorialsPaging, sorting: ListTutorialsSorting) => {
  const { offset = DEFAULT_OFFSET, limit = DEFAULT_LIMIT } = paging;

  const where = {
    ...(filters.title ? { title: { [Op.like]: `%${filters.title}%` } } : {}),
    ...(filters.description ? { description: { [Op.like]: `%${filters.description}%` } } : {}),
  };

  const sortingCriterion = sorting.sortBy === "-id" ? "DESC" : "ASC";
  const order = [Sequelize.literal(`id ${sortingCriterion}`)];

  const { rows: data, count } = await Tutorial.findAndCountAll({ offset, limit, where, order });

  return {
    data,
    count,
    paging: {
      offset,
      limit,
    },
  };
};

export const createTutorial = async (userId: number, tutorialData: CreateTutorialInput) => {
  return await Tutorial.create({ userId, ...tutorialData });
};

export const updateTutorial = async (tutorialId: number, userId: number, tutorialData: UpdateTutorialInput) => {
  const tutorial = await getTutorial(tutorialId);
  if (!tutorial) return null;

  if (tutorial.get("userId") !== userId) {
    throw new ForbiddenError("You are not allowed to update tutorials you don't own");
  }

  return await tutorial.update(tutorialData);
};

export const deleteTutorial = async (userId: number, tutorialId: number) => {
  const tutorial = await Tutorial.findByPk(tutorialId);
  if (!tutorial) return null;

  if (tutorial.get("userId") !== userId) {
    throw new ForbiddenError("You are not allowed to delete tutorials you don't own");
  }

  tutorial.destroy();
  return tutorial;
};

export const deleteUsersTutorials = async (userId: number) => {
  return await Tutorial.destroy({ where: { userId } });
};
