import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

import 'reflect-metadata';
import { HTTPError } from '../errors/http-error';
import { UserRegisterDto } from './dto/register-login.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserService } from './user.service';
import { IUserController } from './users.controller.interface';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);

		this.bindRoutes([
			{ path: '/register', method: 'post', func: this.register },
			{ path: '/login', method: 'post', func: this.login },
			{ path: '/logout', method: 'post', func: this.logout },
			{ path: '/activate/:link', method: 'post', func: this.activeEmail },
			{ path: '/refresh', method: 'post', func: this.refresh },
			{ path: '/all', method: 'post', func: this.getAll },
		]);
	}

	async register({body}: Request<{},{}, UserRegisterDto>, res: Response, next: NextFunction) {
		const result = await new UserService().registration(body)

		
		this.ok(res, {email: result.email, id: result.id});
	}

	login(req: Request<{},{}, UserLoginDto>, res: Response, next: NextFunction) {
		console.log(req.body)
		// this.ok(res, 123);
		next(new HTTPError('Ошибка авторизации', 400, 'login'));
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
