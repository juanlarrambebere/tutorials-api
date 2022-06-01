export type AccessTokenRaw = { userId: number; signedAt: string };
export type AccessToken = { userId: number; signedAt: Date };

declare global {
  namespace Express {
    interface Request {
      accessToken?: AccessToken;
    }
  }
}

export {};
