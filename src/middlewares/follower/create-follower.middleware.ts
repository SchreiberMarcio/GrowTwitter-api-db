import { NextFunction, Request, Response } from 'express';
import { regexUuid } from '../../types';

export class CreateFollowerMiddleware {
	public static validateRequired(
		req: Request,
		res: Response,
		next: NextFunction
	): void {
		const { userId, followerId } = req.body;

		if (!userId) {
			res.status(400).json({
				success: false,
				message: 'O userId é obrigatório !',
			});
			return;
		}

		if (!followerId) {
			res.status(400).json({
				success: false,
				message: 'O followerId é obrigatório !',
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
		const { userId, followerId } = req.body;

		if (typeof userId !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O userId deve ser em formato de texto !',
			});
			return;
		}

		if (typeof followerId !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O followerId deve ser em formato de texto !',
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
		const { userId, followerId } = req.body;

		if (!regexUuid.test(userId)) {
			res.status(400).json({
				success: false,
				message: 'O userId precisa ser um UUID !',
			});
			return;
		}

		if (!regexUuid.test(followerId)) {
			res.status(400).json({
				success: false,
				message: 'O followerId precisa ser um UUID !',
			});
			return;
		}

		next();
	}
}
