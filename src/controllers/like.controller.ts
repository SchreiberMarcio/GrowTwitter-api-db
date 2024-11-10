import { Request, Response } from "express";
import { CreateLikeDto } from "../dtos";
import { LikeService } from "../services/like.service";

export class LikeController {
  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const { userId, tweetId } = req.body;

    
      if (!userId || !tweetId) {
        res.status(400).json({
          success: false,
          message: "IDs de usuário e tweet são obrigatórios.",
        });
        return;
      }

      const data: CreateLikeDto = { userId, tweetId };

      const service = new LikeService();
      const result = await service.create(data);

      const { code, ...response } = result;

      res.status(code).json(response);
    } catch (error: any) {
     
      if (error.message === "Já existe uma curtida para este tweet") {
        res.status(409).json({
          success: false,
          message: "Este tweet já foi curtido por este usuário.",
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
          message: "ID da curtida é obrigatório.",
        });
        return;
      }

      const service = new LikeService();
      const result = await service.remove(id);

      const { code, ...response } = result;

    
      if (code === 404) {
        res.status(404).json({
          success: false,
          message: "Curtida não encontrada.",
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
