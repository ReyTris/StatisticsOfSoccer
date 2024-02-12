import { Response, Router } from 'express';
import { injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { IRouteController } from './route.interface';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;
	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router() {
		return this._router;
	}

	public send<T>(
		res: Response,
		code: number,
		message: T
	): Response<any, Record<string, any>> {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T) {
		return this.send(res, 200, message);
	}

	protected bindRoutes(routes: IRouteController[]) {
		for (const route of routes) {
			this.logger.log(`[${route.method}]: ${route.path}`);
			const middlewares = route.middlewares?.map((middle) =>
				middle.execute.bind(middle)
			);
			const handler = route.func.bind(this);
			const pipeline = middlewares ? [...middlewares, handler] : handler;
			this.router[route.method](route.path, pipeline);
		}
	}
}
