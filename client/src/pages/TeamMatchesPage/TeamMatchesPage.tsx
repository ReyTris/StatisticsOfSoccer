import { Breadcrumb, Table } from 'antd';
import { useLocation } from 'react-router-dom';
import Loader from '../../components/ui/Loader';
import { TeamsBreadcrumbRoute } from '../../constants/breadcrumbs.routes';
import { customStatus, tableColumns } from '../../constants/table.columns';
import { useGetMatchesData } from '../../hooks/useGetData';
import { ICompetitionMatch } from '../../models/response/ICompetitionsMatches';
import { ITableData } from '../DetailPage/types';

const TeamMatchesPage = () => {
	const location = useLocation();
	const pathnames = location.pathname.split('/');
	const matchId = Number(pathnames.at(-1));

	const { dataList, isLoading } = useGetMatchesData(
		'teamMatches',
		'teamMatchesDispatch',
		matchId
	);

	const dataMap = dataList.map(
		(item: ICompetitionMatch, index: number): ITableData => {
			return {
				key: index,
				date: item.utcDate,
				time: item.utcDate,
				status: customStatus[item.status],
				homeTeam: item.homeTeam,
				separator: '-',
				awayTeam: item.awayTeam,
				score: item.score,
			};
		}
	);

	if (isLoading) {
		return (
			<Loader className="absolute w-[200px] h-[200px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
		);
	}

	return (
		<div>
			<div>
				<Breadcrumb separator="/" items={TeamsBreadcrumbRoute} />
			</div>

			<div className="mt-5">
				<Table dataSource={dataMap} columns={tableColumns} />
			</div>
		</div>
	);
};

export default TeamMatchesPage;
