import { TokenModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { TYPES } from '../types';
import { ITokenRepository } from './token.repository.interface';
import { IGenerateToken, IPayloadToken, ITokenService } from './token.service.interface';

@injectable()
export class TokenService implements ITokenService {
	constructor(
		@inject(TYPES.ITokenRepository) private tokenRepository: ITokenRepository
	) {}
	generateToken(payload: IPayloadToken): IGenerateToken {
		const accessToken = jwt.sign(
			payload,
			process.env.ACCESS_TOKEN_SECRET!,
			{
				expiresIn: '30m',
			}
		);
		const refreshToken = jwt.sign(
			payload,
			process.env.REFRESH_TOKEN_SECRET!,
			{
				expiresIn: '30d',
			}
		);

		return {
			accessToken,
			refreshToken,
		};
	}

	async removeToken(refreshToken: string): Promise<TokenModel> {
		const tokenData = await this.tokenRepository.removeToken(refreshToken);
		return tokenData;
	}

	validateAccessToken(token: string): IPayloadToken | null {
		try {
			const userData = jwt.verify(
				token,
				process.env.ACCESS_TOKEN_SECRET!
			) as IPayloadToken;
			return userData;
		} catch (error) {
			return null;
		}
	}

	validateRefreshToken(token: string): any | null {
		try {
			const userData = jwt.verify(
				token,
				process.env.REFRESH_TOKEN_SECRET!
			) as any;
			return userData;
		} catch (error) {
			return null;
		}
	}
}
