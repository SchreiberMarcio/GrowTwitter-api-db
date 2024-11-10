import { TypeTweet } from "@prisma/client";
import { Request, Response } from "express";
import { CreateReplyDto } from "../dtos";
import { ReplyService } from "../services/reply.service";

export class ReplyController {
  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const { content, type, userId, tweetId } = req.body;

      if (!content || !type || !userId || !tweetId) {
        res.status(400).json({
          success: false,
          message: "Conteúdo, tipo, userId e tweetId são obrigatórios.",
        });
        return;
      }

      const data: CreateReplyDto = { content, type, userId, tweetId };
      const service = new ReplyService();
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

      const service = new ReplyService();
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

      const service = new ReplyService();
      const result = await service.findOneById(id);

      const { code, ...response } = result;

      if (code === 404) {
        res.status(404).json({
          success: false,
          message: "Resposta não encontrada.",
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

      const service = new ReplyService();
      const result = await service.update(id, content);

      const { code, ...response } = result;

      if (code === 404) {
        res.status(404).json({
          success: false,
          message: "Resposta não encontrada para atualização.",
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

      const service = new ReplyService();
      const result = await service.remove(id);

      const { code, ...response } = result;

      if (code === 404) {
        res.status(404).json({
          success: false,
          message: "Resposta não encontrada para remoção.",
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
