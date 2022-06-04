import argon2 from "argon2";
import { UniqueConstraintError } from "sequelize";
import { BadRequestError } from "../errors";
import User from "../models/User";
import { CreateUserInput } from "../schemas/createUserSchema/createUserSchema";

export const createUser = async (userInput: CreateUserInput) => {
  userInput.password = await argon2.hash(userInput.password);

  try {
    const user = await User.create(userInput);
    const { password, ...restOfUser } = user.toJSON();
    return { ...restOfUser };
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      throw new BadRequestError("The email is already in use by another user");
    }

    throw error;
  }
};
