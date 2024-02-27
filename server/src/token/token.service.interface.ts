import { TokenModel } from '@prisma/client';

export interface ITokenService {
	generateToken: (payload: IPayloadToken) => IGenerateToken;
	removeToken: (refreshToken: string) => Promise<TokenModel>;
	validateAccessToken: (token: string) => any | null;
	validateRefreshToken: (token: string) => any | null;
}

export interface IGenerateToken {
	accessToken: string;
	refreshToken: string;
}

export interface IPayloadToken {
	id: number;
	email: string;
}
