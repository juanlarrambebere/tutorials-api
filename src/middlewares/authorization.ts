import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../errors";

const FIVE_MINUTES = 5 * 60 * 1000;

const authorize = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.accessToken) {
    return next(new Error("Can't perform authorization before authentication"));
  }

  const { signedAt } = req.accessToken;

  if (new Date().getTime() - signedAt.getTime() > FIVE_MINUTES) {
    return next(new ForbiddenError("The access token has expired"));
  }

  next();
};

export default authorize;
