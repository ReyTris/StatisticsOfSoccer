import { IconType } from 'react-icons';
import { GrProjects } from 'react-icons/gr';
import { LuLayoutList } from 'react-icons/lu';

export interface ISidebarItem {
	id?: number;
	icon: IconType;
	label: string;
	type?: string;
	searchPlaceholder?: string;
}

export const sidebarItemsMain: ISidebarItem[] = [
	{
		id: 1,
		icon: LuLayoutList,
		label: 'Задачи',
		type: 'tasks',
		searchPlaceholder: 'Поиск по задачам',
	},
	{
		id: 2,
		icon: GrProjects,
		label: 'Проекты',
		type: 'projects',
		searchPlaceholder: 'Поиск по проектам',
	},
];
