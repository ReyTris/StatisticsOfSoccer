import { TokenModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../DB/db.config';
import { TYPES } from '../types';
import { ITokenRepository } from './token.repository.interface';


@injectable()
export class TokenRepository implements ITokenRepository {
    constructor(
        @inject(TYPES.PrismaService) private prismaService: PrismaService
    ) {}
    async saveToken(userId: number, refreshToken: string): Promise<TokenModel> {
		const tokenData = await this.prismaService.prisma.tokenModel.upsert({
			where: {
				id: userId,
			},
			update: {
				refreshToken,
			},
			create: {
				id: userId,
				refreshToken,
			},
		});

		return tokenData;
	}
}
