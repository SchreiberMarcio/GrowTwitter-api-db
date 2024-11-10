import { NextFunction, Request, Response } from "express";

export class LoginMiddleware {
  public static validateRequired(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const { email, password } = req.body;

    if (!email) {
      res.status(400).json({
        success: false,
        message: "O atributo e-mail é obrigatório!",
      });
      return;
    }

    if (!password) {
      res.status(400).json({
        success: false,
        message: "O atributo senha é obrigatório!",
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
    const { email, password } = req.body;

    if (typeof email !== "string") {
      res.status(400).json({
        success: false,
        message: "O e-mail deve ser em formato de texto!",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: "O e-mail deve ter um formato válido!",
      });
      return;
    }

   
    if (typeof password !== "string") {
      res.status(400).json({
        success: false,
        message: "A senha deve ser em formato de texto!",
      });
      return;
    }

    next();
  }
}
