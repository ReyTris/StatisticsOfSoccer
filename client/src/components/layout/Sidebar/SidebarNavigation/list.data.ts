export interface ITaskNavigation {
	name: string;
	date: string;
	author: string;
	id: number;
}

export interface IListNavigation {
	[key: string]: ITaskNavigation[];
}

export const mokeList: IListNavigation = {
	tasks: [
		{
			id: 1,
			name: 'First task',
			author: 'Nikita',
			date: '1.03.24',
		},
		{
			id: 2,
			name: 'Second task',
			author: 'Artem',
			date: '1.03.24',
		},
		{
			id: 3,
			name: 'Third task',
			author: 'Sveta',
			date: '2.03.24',
		},
	],
	projects: [
		{
			id: 1,
			name: 'First project',
			author: 'Nikita',
			date: '1.03.24',
		},
		{
			id: 2,
			name: 'Second project',
			author: 'Artem',
			date: '1.03.24',
		},
		{
			id: 3,
			name: 'Third project',
			author: 'Sveta',
			date: '2.03.24',
		},
	],
};
