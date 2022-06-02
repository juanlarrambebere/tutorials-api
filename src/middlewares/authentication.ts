import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors";
import { AccessTokenRaw, UserRole } from "../types";

const ACCESS_TOKEN_HEADER_NAME = "X-Access-Token";

const authenticate = (req: Request, _res: Response, next: NextFunction) => {
  const accessToken = req.header(ACCESS_TOKEN_HEADER_NAME);
  if (!accessToken) {
    return next(new UnauthorizedError("Access token is missing"));
  }

  try {
    const { userId, role, signedAt } = <AccessTokenRaw>jwt.verify(accessToken, process.env.AUTHENTICATION_SECRET!);
    req.accessToken = {
      userId,
      role: role as UserRole,
      signedAt: new Date(signedAt),
    };
  } catch (_error) {
    return next(new UnauthorizedError("Access token is invalid"));
  }

  next();
};

export default authenticate;
