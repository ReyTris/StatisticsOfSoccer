import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';

export interface IProjectController extends BaseController {
	create: (req: Request, res: Response, next: NextFunction) => void;
}
