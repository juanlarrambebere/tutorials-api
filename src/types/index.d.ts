export type UserRole = "admin" | "user";

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
