import { Breadcrumb, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../../components/ui/Loader';
import { CompetitionsBreadcrumbRoute } from '../../constants/breadcrumbs.routes';
import { customStatus, tableColumns } from '../../constants/table.columns';
import { useAppDispatch, useAppSelector } from '../../hooks/useDispatch';
import { ICompetitionMatch } from '../../models/response/ICompetitionsMatches';
import { competitionsMatches } from '../../store/slices/competitionsSlice';
import { ITableData } from './types';

const DetailPage = () => {
	const location = useLocation();
	const pathnames = location.pathname.split('/');
	const matchId = Number(pathnames.at(-1));
	const [dataList, setDataList] = useState<ICompetitionMatch[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dispatch = useAppDispatch();

	const { matches: matchesList, loading: loadingStatus } = useAppSelector(
		(state) => state.competitionsReducer
	);

	useEffect(() => {
		dispatch(competitionsMatches(matchId));
	}, [dispatch, matchId]);

	useEffect(() => {
		setDataList(matchesList);
		console.log(dataList);
	}, [matchesList]);

	useEffect(() => {
		if (!loadingStatus && matchesList.length > 0) {
			setIsLoading(false);
		}
	}, [loadingStatus, matchesList]);

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
				<Breadcrumb separator="/" items={CompetitionsBreadcrumbRoute} />
			</div>

			<div className="mt-5">
				<Table dataSource={dataMap} columns={tableColumns} />
			</div>
		</div>
	);
};

export default DetailPage;
