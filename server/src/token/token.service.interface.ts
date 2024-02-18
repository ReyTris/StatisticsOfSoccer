import { TokenModel } from '@prisma/client';

export interface ITokenService {
	generateToken: (payload: string) => IGenerateToken;
	removeToken: (refreshToken: string) => Promise<TokenModel>;
	validateAccessToken: (token: string) => TokenModel | null;
	validateRefreshToken: (token: string) => TokenModel | null;
}

export interface IGenerateToken {
	accessToken: string;
	refreshToken: string;
}
