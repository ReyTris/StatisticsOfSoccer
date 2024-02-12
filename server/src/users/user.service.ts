import { injectable } from 'inversify';
import { UserRegisterDto } from './dto/register-login.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';

@injectable()
export class UserService implements IUserService {
	async registration({
		name,
		password,
		email,
	}: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		await newUser.setPassword(password);
		return null;
	}

	async login(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
