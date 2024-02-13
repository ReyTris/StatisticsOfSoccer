import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../DB/db.config';
import { TYPES } from '../types';
import { User } from './user.entity';
import { IUsersRepository } from './users.repository.interface';

@injectable()
export class UsersRepository implements IUsersRepository {
	constructor(
		@inject(TYPES.PrismaService) private prismaService: PrismaService
	) {}

	async registration({ name, email, password }: User): Promise<UserModel> {
		return this.prismaService.prisma.userModel.create({
			data: {
				name,
				email,
				password,
			},
		});
	}

	async findUser(email: string): Promise<UserModel | null> {
		return this.prismaService.prisma.userModel.findFirst({
			where: {
				email,
			},
		});
	}
}
