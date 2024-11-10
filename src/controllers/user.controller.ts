import { Request, Response } from "express";
import { CreateUserDto } from "../dtos";
import { UserService } from "../services/user.service";

export class UserController {
  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, username, password } = req.body;

      if (!name || !email || !username || !password) {
        res.status(400).json({
          success: false,
          message:
            "Todos os campos (name, email, username, password) são obrigatórios.",
        });
        return;
      }

      const data: CreateUserDto = { name, email, username, password };
      const service = new UserService();
      const result = await service.create(data);

      const { code, ...response } = result;
      res.status(code).json(response);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: `Erro no servidor: ${error.message}`,
      });
    }
  }

  public static async findAll(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.query;

      if (email && !/\S+@\S+\.\S+/.test(email as string)) {
        res.status(400).json({
          success: false,
          message: "O email fornecido não é válido.",
        });
        return;
      }

      const service = new UserService();
      const result = await service.findAll(email as string);

      const { code, ...response } = result;
      res.status(code).json(response);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: `Erro no servidor: ${error.message}`,
      });
    }
  }

  public static async findOneById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const service = new UserService();
      const result = await service.findOneById(id);

      const { code, ...response } = result;

      if (code === 404) {
        res.status(404).json({
          success: false,
          message: "Usuário não encontrado.",
        });
        return;
      }

      res.status(code).json(response);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: `Erro no servidor: ${error.message}`,
      });
    }
  }

  public static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, username, password } = req.body;

      if (!name && !username && !password) {
        res.status(400).json({
          success: false,
          message:
            "Pelo menos um campo (name, username ou password) deve ser fornecido para atualização.",
        });
        return;
      }

      const service = new UserService();
      const result = await service.update(id, { name, username, password });

      const { code, ...response } = result;

      if (code === 404) {
        res.status(404).json({
          success: false,
          message: "Usuário não encontrado para atualização.",
        });
        return;
      }

      res.status(code).json(response);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: `Erro no servidor: ${error.message}`,
      });
    }
  }

  public static async remove(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const service = new UserService();
      const result = await service.remove(id);

      const { code, ...response } = result;

      if (code === 404) {
        res.status(404).json({
          success: false,
          message: "Usuário não encontrado para remoção.",
        });
        return;
      }

      res.status(code).json(response);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: `Erro no servidor: ${error.message}`,
      });
    }
  }
}
