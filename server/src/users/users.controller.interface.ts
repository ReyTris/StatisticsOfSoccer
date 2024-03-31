import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';

export interface IUserController extends BaseController {
	register: (req: Request, res: Response, next: NextFunction) => void;
	login: (req: Request, res: Response, next: NextFunction) => void;
	logout: (req: Request, res: Response, next: NextFunction) => void;
	refresh: (req: Request, res: Response, next: NextFunction) => void;
	activeEmail: (req: Request, res: Response, next: NextFunction) => void;
	getAll: (req: Request, res: Response, next: NextFunction) => void;
}
