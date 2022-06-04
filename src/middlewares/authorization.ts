import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../errors";
import { AccessToken, UserRole } from "../types";

const FIVE_MINUTES = 5 * 60 * 1000;
const WRITE_HTTP_VERBS = new Set(["POST", "PUT", "DELETE", "PATCH"]);

const isUserAdmin = (role: UserRole) => role === "admin";

const isWriteOperation = (req: Request) => WRITE_HTTP_VERBS.has(req.method);

const isTokenExpired = (accessToken: AccessToken) => new Date().getTime() - accessToken.signedAt.getTime() > FIVE_MINUTES;

const authorize = (req: Request, _res: Response, next: NextFunction) => {
  const accessToken = req.accessToken;

  if (!accessToken) {
    return next(new Error("Can't perform authorization before authentication"));
  }

  if (isTokenExpired(accessToken)) {
    return next(new ForbiddenError("The access token has expired"));
  }

  if (isWriteOperation(req) && !isUserAdmin(accessToken.role)) {
    return next(new ForbiddenError("Only admins can perform write operations"));
  }

  next();
};

export default authorize;
