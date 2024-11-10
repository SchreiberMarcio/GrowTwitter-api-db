import { TypeTweet } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { regexUuid } from '../../types';

export class CreateReplyMiddleware {
	public static validateRequired(
		req: Request,
		res: Response,
		next: NextFunction
	): void {
		const { content, type, userId, tweetId } = req.body;

		if (!content) {
			res.status(400).json({
				success: false,
				message: 'O conteúdo é obrigatório !',
			});
			return;
		}

		if (!type) {
			res.status(400).json({
				success: false,
				message: 'O type é obrigatório !',
			});
			return;
		}

		if (!userId) {
			res.status(400).json({
				success: false,
				message: 'O userId é obrigatório !',
			});
			return;
		}

		if (!tweetId) {
			res.status(400).json({
				success: false,
				message: 'O tweetId é obrigatório !',
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
		const { content, type, userId, tweetId } = req.body;

		if (typeof content !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O conteúdo deve ser em formato de texto !',
			});
			return;
		}

		if (typeof type !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O type deve ser em formato de texto !',
			});
			return;
		}

		if (typeof userId !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O userId deve ser em formato de texto !',
			});
			return;
		}

		if (typeof tweetId !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O tweetId deve ser em formato de texto !',
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
		const { content, type, userId, tweetId } = req.body;

		if (content.length < 5) {
			res.status(400).json({
				success: false,
				message: 'O conteúdo deve ter pelo menos 5 caracteres !',
			});
			return;
		}

		if (type !== TypeTweet.Reply) {
			res.status(400).json({
				success: false,
				message: 'O type deve ser do tipo (Reply) !',
			});
			return;
		}

		if (!regexUuid.test(userId)) {
			res.status(400).json({
				success: false,
				message: 'O identificador do userId precisa ser um UUID !',
			});
			return;
		}

		if (!regexUuid.test(tweetId)) {
			res.status(400).json({
				success: false,
				message: 'O identificador do tweetId precisa ser um UUID !',
			});
			return;
		}

		next();
	}
}
