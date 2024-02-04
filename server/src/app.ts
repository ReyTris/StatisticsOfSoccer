import express, { Express } from 'express';
import { Server } from 'http';
import userRouter from './users/users';

export class App {
	app: Express;
	server!: Server;
	port: string | number;

	constructor() {
		this.app = express();
		this.port = process.env.PORT || 3000;
	}

	userRoutes() {
		this.app.use('/', userRouter);
	}

	public async init() {
		this.userRoutes();
		this.server = this.app.listen(this.port);
		console.log(`server is running on PORT: ${this.port}`);
	}
}
