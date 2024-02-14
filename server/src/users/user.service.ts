import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { HTTPError } from '../errors/http-error';
import { TYPES } from '../types';
import { UserRegisterDto } from './dto/register-login.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './user.entity';
import { IUserAuth, IUserService } from './user.service.interface';
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
	}: UserRegisterDto): Promise<IUserAuth> {
		const newUser = new User(email, name);
		await newUser.setPassword(password);

		const existedUser = await this.usersRepository.findUser(email);
		if (existedUser) {
			throw new HTTPError('Такой пользователь уже существует', 422);
		}
		const registeredUser = await this.usersRepository.registration(newUser);
		const tokens = this.generateToken(email);
		await this.usersRepository.saveToken(
			registeredUser.id,
			tokens.refreshToken
		);

		return { ...tokens, user: registeredUser };
	}

	async login({ email, password }: UserLoginDto): Promise<IUserAuth> {
		const existedUser = await this.usersRepository.findUser(email);

		if (!existedUser) {
			throw new HTTPError('Неверное мыло или пароль', 423);
		}

		const newUser = new User(
			existedUser.email,
			existedUser.name,
			existedUser.password
		);

		if (!(await newUser.comparePassword(password))) {
			throw new HTTPError('Неверное мыло или пароль', 423);
		}

		const tokens = this.generateToken(email);
		await this.usersRepository.saveToken(existedUser.id, tokens.refreshToken);

		return { ...tokens, user: existedUser };
	}

	generateToken(payload: string): any {
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
