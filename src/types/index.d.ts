import { USER_ROLES } from "../models/User";

export type UserRole = typeof USER_ROLES[number];

export type AccessTokenRaw = { userId: number; signedAt: string; role: string };
export type AccessToken = { userId: number; signedAt: Date; role: UserRole };

declare global {
  namespace Express {
    interface Request {
      accessToken?: AccessToken;
    }
  }
}

export {};
