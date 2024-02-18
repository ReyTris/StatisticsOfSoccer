import { TokenModel } from '@prisma/client';

export interface ITokenRepository {
	saveToken: (userId: number, refreshToken: string) => Promise<TokenModel>;
	removeToken: (refreshToken: string) => Promise<TokenModel>;
	findToken: (refreshToken: string) => Promise<TokenModel | null>;
}
