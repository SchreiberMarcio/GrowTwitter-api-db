import { NextFunction, Request, Response } from "express";
import { regexUuid } from "../../types";

export class CreateLikeMiddleware {
  public static validateRequired(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const { userId, tweetId } = req.body;

    if (!userId) {
      res.status(400).json({
        success: false,
        message: "O userId é obrigatório!",
      });
      return;
    }

    if (!tweetId) {
      res.status(400).json({
        success: false,
        message: "O tweetId é obrigatório!",
      });
      return;
    }

    next();
  }

  public static validateTypes(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const { userId, tweetId } = req.body;

    if (typeof userId !== "string") {
      res.status(400).json({
        success: false,
        message: "O userId deve ser em formato de texto!",
      });
      return;
    }

    if (typeof tweetId !== "string") {
      res.status(400).json({
        success: false,
        message: "O tweetId deve ser em formato de texto!",
      });
      return;
    }

    next();
  }

  public static validateData(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const { userId, tweetId } = req.body;

    if (!regexUuid.test(userId)) {
      res.status(400).json({
        success: false,
        message: "O userId precisa ser um UUID válido!",
      });
      return;
    }

    if (!regexUuid.test(tweetId)) {
      res.status(400).json({
        success: false,
        message: "O tweetId precisa ser um UUID válido!",
      });
      return;
    }

    next();
  }
}
