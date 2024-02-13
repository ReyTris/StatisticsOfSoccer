import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

import 'reflect-metadata';
import { ValidateMiddleware } from '../common/validate.middleware';
import { HTTPError } from '../errors/http-error';
import { UserRegisterDto } from './dto/register-login.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { IUserService } from './user.service.interface';
import { IUserController } from './users.controller.interface';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService
	) {
		super(loggerService);

		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{ path: '/logout', method: 'post', func: this.logout },
			{ path: '/activate/:link', method: 'post', func: this.activeEmail },
			{ path: '/refresh', method: 'post', func: this.refresh },
			{ path: '/all', method: 'post', func: this.getAll },
		]);
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const result = await this.userService.registration(body);
		if (!result) {
			return next(new HTTPError('Такой пользователь уже существует', 422));
		}
		this.ok(res, { email: result.email, id: result.id });
	}

	async login(
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const result = await this.userService.login(body);
		if (!result) {
			return next(new HTTPError('Неверное мыло или пароль', 423));
		}
		this.ok(res, { email: body.email });
	}

	logout(req: Request, res: Response, next: NextFunction) {
		this.ok(res, 'logout');
	}

	activeEmail(req: Request, res: Response, next: NextFunction) {
		this.ok(res, 'register');
	}

	refresh(req: Request, res: Response, next: NextFunction) {
		this.ok(res, 'register');
	}

	getAll(req: Request, res: Response, next: NextFunction) {
		this.ok(res, 'register');
	}
}
