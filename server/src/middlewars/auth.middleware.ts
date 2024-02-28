import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { HTTPError } from '../errors/http-error';
import { ITokenService } from '../token/token.service.interface';
import { TYPES } from '../types';
import { IMiddleware } from './middleware.interface';

@injectable()
export class AuthMiddleware implements IMiddleware {
	constructor(
		@inject(TYPES.ITokenService) private tokenService: ITokenService
	) {}
	execute(req: Request, res: Response, next: NextFunction) {
		try {
			const authorizationHeader = req.headers.authorization;
			if (!authorizationHeader) {
				return next(new HTTPError('Пользователь не авторизован', 401));
			}
			// console.log(authorizationHeader);
			

			const accessToken = authorizationHeader?.split(' ')[1];

			if (!accessToken) {
				return next(new HTTPError('Пользователь не авторизован', 401));
			}

			const userData = this.tokenService.validateAccessToken(accessToken);

			if (!userData) {
				return next(new HTTPError('Пользователь не авторизован', 401));
			}

			req.body = userData;
			next();
		} catch (error) {
			return next(new HTTPError('Пользователь не авторизован', 401));
		}
	}
}
