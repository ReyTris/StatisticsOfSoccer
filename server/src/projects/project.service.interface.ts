import { ProjectModel } from '@prisma/client';

export interface IProjectService {
	create: (name: string, description: string | null) => Promise<ProjectModel>;
}
