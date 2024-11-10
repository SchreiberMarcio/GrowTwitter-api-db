import { TypeTweet } from "@prisma/client";
import { Request, Response } from "express";
import { CreateTweetDto } from "../dtos";
import { TweetService } from "../services/tweet.service";

export class TweetController {
  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const { content, type, userId } = req.body;

      if (!content || !type || !userId) {
        res.status(400).json({
          success: false,
          message: "Conteúdo, tipo e userId são obrigatórios.",
        });
        return;
      }

      const data: CreateTweetDto = { content, type, userId };
      const service = new TweetService();
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
      const type = req.query.type as string;

      if (type && !Object.values(TypeTweet).includes(type as TypeTweet)) {
        res.status(400).json({
          success: false,
          message: "Tipo de tweet inválido.",
        });
        return;
      }

      const service = new TweetService();
      const result = await service.findAll(type as TypeTweet);

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

      const service = new TweetService();
      const result = await service.findOneById(id);

      const { code, ...response } = result;

      if (code === 404) {
        res.status(404).json({
          success: false,
          message: "Tweet não encontrado.",
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
      const { content } = req.body;

      if (!content) {
        res.status(400).json({
          success: false,
          message: "Conteúdo é obrigatório para atualização.",
        });
        return;
      }

      const service = new TweetService();
      const result = await service.update(id, content);

      const { code, ...response } = result;

      if (code === 404) {
        res.status(404).json({
          success: false,
          message: "Tweet não encontrado para atualização.",
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

      const service = new TweetService();
      const result = await service.remove(id);

      const { code, ...response } = result;

      if (code === 404) {
        res.status(404).json({
          success: false,
          message: "Tweet não encontrado para remoção.",
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
