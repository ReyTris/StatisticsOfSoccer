import { UserModel } from '@prisma/client';
import { UserRegisterDto } from './dto/register-login.dto';
import { UserLoginDto } from './dto/user-login.dto';

export interface IUserService {
	registration: (dto: UserRegisterDto) => Promise<UserModel | null>;
	login: (dto: UserLoginDto) => Promise<boolean>;
}
