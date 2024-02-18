import { TokenModel } from '@prisma/client';

export interface ITokenRepository {
    saveToken: (userId: number, refreshToken: string) => Promise<TokenModel>
}