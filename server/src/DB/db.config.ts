import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

import 'reflect-metadata';

@injectable()
export class PrismaService {
	prisma: PrismaClient;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.prisma = new PrismaClient();
	}

	async connect(): Promise<void> {
		await this.prisma.$connect();
		this.logger.log(`[PrismaService] успешно подключились к базе`);
	}

	async disconnect(): Promise<void> {
		await this.prisma.$disconnect();
	}

	// async client() {
	// 	await this.client();
	// }
}
