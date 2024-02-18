import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

import 'reflect-metadata';
import { IMiddleware } from '../middlewars/middleware.interface';
import { ValidateMiddleware } from '../middlewars/validate.middleware';
import { ITokenService } from '../token/token.service.interface';
import { UserRegisterDto } from './dto/register-login.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { IUserService } from './user.service.interface';
import { IUserController } from './users.controller.interface';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ITokenService) private tokenService: ITokenService,
		@inject(TYPES.IMiddleware) private authMiddleware: IMiddleware
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
			{ path: '/refresh', method: 'get', func: this.refresh },
			{
				path: '/all',
				method: 'get',
				func: this.getAll,
				middlewares: [this.authMiddleware],
			},
		]);
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const result = await this.userService.registration(body);
			res.cookie('refreshToken', result.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			this.ok(res, result);
		} catch (e) {
			next(e);
		}
	}

	async login(
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const result = await this.userService.login(body);
			res.cookie('refreshToken', result.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			this.ok(res, result);
		} catch (e) {
			next(e);
		}
	}

	async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { refreshToken } = req.cookies;
			const token = await this.tokenService.removeToken(refreshToken);
			res.clearCookie(refreshToken);
			this.ok(res, `${token.id}: Вышел из системы`);
		} catch (error) {
			next(error);
		}
	}

	activeEmail(req: Request, res: Response, next: NextFunction) {
		this.ok(res, 'register');
	}

	async refresh(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { refreshToken } = req.cookies;
			const result = await this.userService.refresh(refreshToken);
			res.cookie('refreshToken', result.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			this.ok(res, result);
		} catch (error) {
			next(error);
		}
	}

	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			return res.json(await this.userService.getAllUsers());
		} catch (error) {
			next(error);
		}
		this.ok(res, 'register');
	}
}
