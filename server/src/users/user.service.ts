import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { TYPES } from '../types';
import { UserRegisterDto } from './dto/register-login.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './user.entity';
import { IUserService, UserAuth } from './user.service.interface';
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
	}: UserRegisterDto): Promise<UserAuth | null> {
		const newUser = new User(email, name);
		await newUser.setPassword(password);

		const existedUser = await this.usersRepository.findUser(email);
		if (existedUser) {
			return null;
		}
		const registeredUser = await this.usersRepository.registration(newUser);
		const tokens = this.generateToken(email);
		await this.usersRepository.saveToken(
			registeredUser.id,
			tokens.refreshToken
		);

		return { ...tokens, user: registeredUser };
	}

	async login({ email, password }: UserLoginDto): Promise<UserAuth | boolean> {
		const existedUser = await this.usersRepository.findUser(email);

		if (!existedUser) {
			return false;
		}

		const newUser = new User(
			existedUser.email,
			existedUser.name,
			existedUser.password
		);

		if (!(await newUser.comparePassword(password))) {
			return false;
		}

		const tokens = this.generateToken(email);
		await this.usersRepository.saveToken(existedUser.id, tokens.refreshToken);

		return { ...tokens, user: existedUser };
	}

	generateToken(payload: any): any {
		const accessToken = jwt.sign({ payload }, 'APPPROOFWORK', {
			expiresIn: '30m',
		});
		const refreshToken = jwt.sign({ payload }, 'APPPROOFWORK', {
			expiresIn: '30d',
		});

		return {
			accessToken,
			refreshToken,
		};
	}
}
