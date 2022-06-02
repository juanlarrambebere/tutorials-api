import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import Tutorial from "../models/Tutorial";
import { CreateTutorialInput } from "../schemas/createTutorialSchema";
import { ListTutorialsFilters, ListTutorialsPaging, ListTutorialsSorting } from "../schemas/listTutorialsSchema";

export const MAX_LIMIT = 200;
const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 50;

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
