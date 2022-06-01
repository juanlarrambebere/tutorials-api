import argon2 from "argon2";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const authenticateUser = async (email: string, password: string): Promise<string | null> => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return null;
  }

  const isPasswordCorrect = await argon2.verify(user.password, password);
  if (!isPasswordCorrect) {
    return null;
  }

  return jwt.sign(
    {
      user_id: user.id,
      signed_at: new Date(),
    },
    process.env.AUTHENTICATION_SECRET!
  );
};
