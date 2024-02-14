import { UserModel } from '@prisma/client';
import { UserRegisterDto } from './dto/register-login.dto';
import { UserLoginDto } from './dto/user-login.dto';

export interface IUserService {
	registration: (dto: UserRegisterDto) => Promise<UserAuth | null>;
	login: (dto: UserLoginDto) => Promise<UserAuth | boolean>;
	generateToken: (payload: Object) => void;
}

export interface UserAuth {
	accessToken: string;
	refreshToken: string;
	user: UserModel;
}
