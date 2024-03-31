import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { HTTPError } from '../errors/http-error';
import { ITokenRepository } from '../token/token.repository.interface';
import { ITokenService } from '../token/token.service.interface';
import { TYPES } from '../types';
import { UserRegisterDto } from './dto/register-login.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './user.entity';
import { IUserAuth, IUserService } from './user.service.interface';
import { IUsersRepository } from './users.repository.interface';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.IUsersRepository) private usersRepository: IUsersRepository,
		@inject(TYPES.ITokenService) private tokenService: ITokenService,
		@inject(TYPES.ITokenRepository) private tokenRepository: ITokenRepository
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
		console.log(registeredUser);

		const tokens = this.tokenService.generateToken({
			id: registeredUser.id,
			email: registeredUser.email,
		});
		await this.tokenRepository.saveToken(
			registeredUser.id,
			tokens.refreshToken
		);

		return { ...tokens, user: registeredUser };
	}

	async login({ email, password }: UserLoginDto): Promise<IUserAuth> {
		const existedUser = await this.usersRepository.findUser(email);

		if (!existedUser) {
			throw new HTTPError('Неверное мыло или пароль', 401);
		}

		const newUser = new User(
			existedUser.email,
			existedUser.name,
			existedUser.password
		);

		if (!(await newUser.comparePassword(password))) {
			throw new HTTPError('Неверное мыло или пароль', 401);
		}

		const tokens = this.tokenService.generateToken({
			id: existedUser!.id,
			email: existedUser!.email,
		});
		await this.tokenRepository.saveToken(existedUser.id, tokens.refreshToken);
		return { ...tokens, user: existedUser };
	}

	async refresh(refreshToken: string): Promise<IUserAuth> {
		if (!refreshToken) {
			throw new HTTPError('Не авторизированный пользователь', 401);
		}
		const userData = this.tokenService.validateRefreshToken(refreshToken);

		const tokenFromDb = this.tokenRepository.findToken(refreshToken);
		if (!userData || !tokenFromDb) {
			throw new HTTPError('Не авторизированный пользователь', 401);
		}

		const existedUser = await this.usersRepository.findUserById(userData.id);

		if (!existedUser) {
			throw new HTTPError('Не авторизированный пользователь при refresh', 401);
		}

		const tokens = this.tokenService.generateToken({
			id: existedUser!.id,
			email: existedUser!.email,
		});
		await this.tokenRepository.saveToken(existedUser!.id, tokens.refreshToken);

		return { ...tokens, user: existedUser };
	}

	async getAllUsers(): Promise<UserModel[]> {
		return await this.usersRepository.getAllUsers();
	}
}
