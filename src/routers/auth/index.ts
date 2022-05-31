import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: "Not implemented yet" });
});

export default router;
