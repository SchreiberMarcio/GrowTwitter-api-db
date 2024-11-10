import { NextFunction, Request, Response } from 'express';

export class CreateUserMiddleware {
	public static validateRequired(
		req: Request,
		res: Response,
		next: NextFunction
	): void {
		const { name, email, username, password } = req.body;

		if (!name) {
			res.status(400).json({
				success: false,
				message: 'O nome é obrigatório !',
			});
			return;
		}

		if (!email) {
			res.status(400).json({
				success: false,
				message: 'O email é obrigatório !',
			});
			return;
		}

		if (!username) {
			res.status(400).json({
				success: false,
				message: 'O username é obrigatório !',
			});
			return;
		}

		if (!password) {
			res.status(400).json({
				success: false,
				message: 'O password é obrigatório !',
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
		const { name, email, username, password } = req.body;

		if (typeof name !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O  nome deve ser em formato de texto !',
			});
			return;
		}

		if (typeof email !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O email deve ser em formato de texto !',
			});
			return;
		}

		if (typeof username !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O username deve ser em formato de texto !',
			});
			return;
		}

		if (typeof password !== 'string') {
			res.status(400).json({
				success: false,
				message: 'O senha deve ser em formato de texto !',
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
		const { name, email, username, password } = req.body;

		if (name.length < 3) {
			res.status(400).json({
				success: false,
				message: 'O nome deve ter pelo menos 3 caracteres !',
			});
			return;
		}

		if (!email.includes('@') || !email.includes('.com')) {
			res.status(400).json({
				success: false,
				message: 'O e-mail deve conter (@) e (.com)',
			});
			return;
		}

		if (username.length < 5) {
			res.status(400).json({
				success: false,
				message: 'O username deve ter pelo menos 5 caracteres !',
			});
			return;
		}

		if (password.length < 5) {
			res.status(400).json({
				success: false,
				message: 'O password deve ter pelo menos 5 caracteres !',
			});
			return;
		}

		next();
	}
}
