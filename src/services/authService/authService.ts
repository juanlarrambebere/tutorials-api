import argon2 from "argon2";
import jwt from "jsonwebtoken";
import User from "../../models/User";
import { AccessTokenRaw, UserRole } from "../../types";

export const authenticateUser = async (email: string, password: string): Promise<string | null> => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return null;
  }

  const isPasswordCorrect = await argon2.verify(user.password, password);
  if (!isPasswordCorrect) {
    return null;
  }

  const accessToken = jwt.sign(
    {
      userId: user.id,
      role: user.role,
      signedAt: new Date(),
    },
    process.env.AUTHENTICATION_SECRET!
  );

  await user.update({ accessToken });

  return accessToken;
};

const isUserLatestAccessToken = (user: User, encodedAccessToken: string) => user.accessToken === encodedAccessToken;

export const decodeAccessToken = async (encodedAccessToken: string) => {
  let tokenRaw: AccessTokenRaw;

  try {
    tokenRaw = <AccessTokenRaw>jwt.verify(encodedAccessToken, process.env.AUTHENTICATION_SECRET!);
  } catch (_error) {
    return null;
  }

  const user = await User.findByPk(tokenRaw.userId);

  return user && isUserLatestAccessToken(user, encodedAccessToken)
    ? {
        userId: tokenRaw.userId,
        role: tokenRaw.role as UserRole,
        signedAt: new Date(tokenRaw.signedAt),
      }
    : null;
};
