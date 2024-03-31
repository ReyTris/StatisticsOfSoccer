import { ProjectModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../DB/db.config';
import { TYPES } from '../types';
import { IProjectService } from './project.service.interface';

@injectable()
export class ProjectService implements IProjectService {
	constructor(
		@inject(TYPES.PrismaService) private prismaService: PrismaService
	) {}

	async create(
		name: string,
		description: string | null
	): Promise<ProjectModel> {
		return this.prismaService.prisma.projectModel.create({
			data: {
				name,
				description: description || '',
			},
		});
	}
}
