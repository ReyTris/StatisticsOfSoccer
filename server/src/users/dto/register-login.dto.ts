import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsString()
	name: string;

	@IsEmail({}, { message: 'неверный email' })
	email: string;

	@IsString({ message: 'Не указан пароль' })
	password: string;
}
