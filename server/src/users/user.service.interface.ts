import { UserRegisterDto } from './dto/register-login.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './user.entity';

export interface IUserService {
	registration: (dto: UserRegisterDto) => Promise<User | null>;
	login: (dto: UserLoginDto) => Promise<boolean>;
}
