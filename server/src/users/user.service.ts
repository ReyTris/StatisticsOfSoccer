import { UserRegisterDto } from './dto/register-login.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { IUserService } from './user.service.interface';

export class UserService implements IUserService {
    async registration({name, password, email}: UserRegisterDto) {
        // const candidate = await prisma.user.findFirst({
        //     where: {
        //         email
        //     }
        // })

        // if (candidate) {
        //     throw new HTTPError('Пользователь есть', 401)
        // }

        // const newUser = await prisma.user.create({
        //     data: {
        //         email, 
        //         name,
        //         password
        //     }
        // })

        // return newUser
    }

    async login(dto: UserLoginDto) {

    }
}