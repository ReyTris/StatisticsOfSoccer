import { NextFunction, Request, Response } from 'express';

export class TestMIddleware {
	execute(req: Request, res: Response, next: NextFunction) {
		next()
	}
}
