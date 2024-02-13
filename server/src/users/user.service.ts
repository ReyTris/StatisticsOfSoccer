import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { UserRegisterDto } from './dto/register-login.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';
import { IUsersRepository } from './users.repository.interface';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.IUsersRepository) private usersRepository: IUsersRepository
	) {}

	async registration({
		name,
		password,
		email,
	}: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name);
		await newUser.setPassword(password);

		const existedUser = await this.usersRepository.findUser(email);
		if (existedUser) {
			return null;
		}
		return this.usersRepository.registration(newUser);
	}

	async login(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
