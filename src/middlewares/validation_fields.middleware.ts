import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { validationHandler } from "@/utilities";

export function validationField(req: Request, res: Response, next: NextFunction) {
  try {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      const msg = error.array().map(({ msg, param }) => ({ msg, param }));
      return res.status(400).json(validationHandler(msg));
    }

    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
}
