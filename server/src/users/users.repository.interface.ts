import { UserModel } from '@prisma/client';
import { User } from './user.entity';

export interface IUsersRepository {
	registration: (user: User) => Promise<UserModel>;
	findUser: (email: string) => Promise<UserModel | null>;
	findUserById: (id: number) => Promise<UserModel | null>;
	getAllUsers: () => Promise<UserModel[]>;
}
