import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: "Not implemented yet" });
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: "Not implemented yet" });
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: "Not implemented yet" });
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: "Not implemented yet" });
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: "Not implemented yet" });
});

router.delete("/mass_delete", async (req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: "Not implemented yet" });
});

export default router;
