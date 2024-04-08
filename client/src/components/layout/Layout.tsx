import { useEffect } from 'react';
import { CompetitionsService } from '../../services/competitions/competitions.service';

function Layout() {
	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await CompetitionsService.getAllTeams();
				console.log(result.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	});
	return <div>Layout</div>;
}

export default Layout;
