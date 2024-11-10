import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

    
      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: "Email e senha são obrigatórios.",
        });
        return;
      }

      const service = new AuthService();
      const result = await service.login({ email, password });

      const { code, ...response } = result;
      res.status(code).json(response);
    } catch (error: any) {
  
      if (error.message === "Credenciais inválidas") {
        res.status(401).json({
          success: false,
          message: "Email ou senha incorretos.",
        });
        return;
      }

     
      res.status(500).json({
        success: false,
        message: `Erro no servidor: ${error.message}`,
      });
    }
  }
}
