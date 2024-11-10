import { Request, Response } from "express";
import { CreateFollowerDto } from "../dtos";
import { FollowerService } from "../services/follower.service";

export class FollowerController {
  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const { userId, followerId } = req.body;

      
      if (!userId || !followerId) {
        res.status(400).json({
          success: false,
          message: "IDs de usuário e seguidor são obrigatórios.",
        });
        return;
      }

      const data: CreateFollowerDto = { userId, followerId };

      const service = new FollowerService();
      const result = await service.create(data);

      const { code, ...response } = result;
      res.status(code).json(response);
    } catch (error: any) {
    
      if (error.message === "Seguidor já existe") {
        res.status(409).json({
          success: false,
          message: "Este seguidor já foi adicionado.",
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: `Erro no servidor: ${error.message}`,
      });
    }
  }

  public static async remove(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

  
      if (!id) {
        res.status(400).json({
          success: false,
          message: "ID do seguidor é obrigatório.",
        });
        return;
      }

      const service = new FollowerService();
      const result = await service.remove(id);

      const { code, ...response } = result;

    
      if (code === 404) {
        res.status(404).json({
          success: false,
          message: "Seguidor não encontrado.",
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
