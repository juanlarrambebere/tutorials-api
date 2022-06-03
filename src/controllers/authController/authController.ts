import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../errors";
import { UserAuthInput } from "../../schemas/userAuthInputSchema";
import { authenticateUser } from "../../services/authService";

export const authHandler = async (req: Request<{}, {}, UserAuthInput>, res: Response, next: NextFunction) => {
  const { password, email } = req.body;

  try {
    const accessToken = await authenticateUser(email, password);
    if (!accessToken) {
      return next(new UnauthorizedError("Invalid credentials"));
    }

    return res.status(200).json({ accessToken });
  } catch (error: unknown) {
    next(error);
  }
};
