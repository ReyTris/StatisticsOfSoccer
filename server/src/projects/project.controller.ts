import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IProjectService } from './project.service.interface';
import { IProjectController } from './projects.controller.interface';

@injectable()
export class ProjectController
	extends BaseController
	implements IProjectController
{
	constructor(
		@inject(TYPES.IProjectService) private projectService: IProjectService,
		@inject(TYPES.ILogger) private loggerService: ILogger
	) {
		super(loggerService);

		this.bindRoutes([
			{
				path: '/project/create',
				func: this.create,
				method: 'post',
			},
		]);
	}

	async create(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { name, description } = req.body;
			const result = await this.projectService.create(name, description);
			this.ok(res, result);
		} catch (error) {
			next(error);
		}
	}
}
