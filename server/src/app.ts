import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { UserController } from './users/users.controller';

@injectable()
export class App {
	app: Express;
	server!: Server;
	port: string | number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private UserController: UserController,
		@inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter
	) {
		this.app = express();
		this.port = process.env.PORT || 3000;
		this.exceptionFilter = exceptionFilter;
	}

	userRoutes() {
		this.app.use('/api', this.UserController.router);
	}

	useExceptionFilter() {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init() {
		this.app.use(cookieParser());
		this.app.use(cors());
		this.userRoutes();
		this.useExceptionFilter();
		this.server = this.app.listen(this.port);
		this.logger.log(`server is running on PORT: ${this.port}`);
	}
}
