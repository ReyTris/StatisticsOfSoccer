export const breadCrumbMap = (nameTeam: string) => {
	return [
		{
			title: 'Лиги',
			href: '/competitions',
		},
		{
			title: nameTeam,
		},
	];
};
