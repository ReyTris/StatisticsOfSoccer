import { UserRegisterDto } from './dto/register-login.dto';
import { UserLoginDto } from './dto/user-login.dto';

export interface IUserService {
    registration: (dto: UserRegisterDto) => any
    login: (dto: UserLoginDto) => void
}