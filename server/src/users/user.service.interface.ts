import { UserModel } from '@prisma/client';
import { UserRegisterDto } from './dto/register-login.dto';
import { UserLoginDto } from './dto/user-login.dto';

export interface IUserService {
	registration: (dto: UserRegisterDto) => Promise<IUserAuth>;
	login: (dto: UserLoginDto) => Promise<IUserAuth>;
	refresh: (refreshToken: string) => Promise<IUserAuth>;
	getAllUsers: () => Promise<UserModel[]>;
}

export interface IUserAuth {
	accessToken: string;
	refreshToken: string;
	user: UserModel | null;
}
