import { TokenModel, UserModel } from '@prisma/client';
import { User } from './user.entity';

export interface IUsersRepository {
	registration: (user: User) => Promise<UserModel>;
	findUser: (email: string) => Promise<UserModel | null>;
	saveToken: (userId: number, refreshToken: string) => Promise<TokenModel>;
}
