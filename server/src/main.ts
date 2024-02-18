import { Container, ContainerModule, interfaces } from 'inversify';
import { PrismaService } from './DB/db.config';
import { App } from './app';
import { ExceptionFilter } from './errors/exception.filter';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { AuthMiddleware } from './middlewars/auth.middleware';
import { IMiddleware } from './middlewars/middleware.interface';
import { TokenRepository } from './token/token.repository';
import { ITokenRepository } from './token/token.repository.interface';
import { TokenService } from './token/token.service';
import { ITokenService } from './token/token.service.interface';
import { TYPES } from './types';
import { UserService } from './users/user.service';
import { IUserService } from './users/user.service.interface';
import { UserController } from './users/users.controller';
import { IUserController } from './users/users.controller.interface';
import { UsersRepository } from './users/users.repository';
import { IUsersRepository } from './users/users.repository.interface';

export const appBinding = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService);
	bind<IUsersRepository>(TYPES.IUsersRepository).to(UsersRepository);
	bind<ITokenService>(TYPES.ITokenService).to(TokenService);
	bind<ITokenRepository>(TYPES.ITokenRepository).to(TokenRepository);
	bind<IMiddleware>(TYPES.IMiddleware).to(AuthMiddleware);
	bind<App>(TYPES.Application).to(App);
});

function bootstrap() {
	const appContainer = new Container();
	appContainer.load(appBinding);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();

	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
