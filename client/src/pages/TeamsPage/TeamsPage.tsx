import { Pagination } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';
import SearchField from '../../components/ui/SearchField';
import { useGetMatchesData } from '../../hooks/useGetData';
import { ITeamResponse } from '../../models/response/ITeamResponse';

const TeamsPage = () => {
	const [filterDataList, setFilterDataList] = useState<ITeamResponse[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const itemsPerPage = 6;

	const { dataList, isLoading } = useGetMatchesData('teams', 'teamsAction');

	const searchHandler = useCallback(
		(value: string) => {
			const searchResult = dataList.filter((item: ITeamResponse) => {
				return item.name.toLowerCase().includes(value.toLowerCase());
			});

			setFilterDataList(searchResult);
		},
		[dataList]
	);

	const handleChangePage = (page: number) => {
		setCurrentPage(page);
	};

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentPageData = filterDataList.slice(startIndex, endIndex);

	useEffect(() => {
		setFilterDataList(dataList);
	}, [dataList]);

	if (isLoading) {
		return (
			<Loader className="absolute w-[200px] h-[200px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
		);
	}

	return (
		<div>
			<SearchField
				placeholder="Поиск лиги"
				searchHandler={searchHandler}
			></SearchField>

			{currentPageData.length > 0 ? (
				<div>
					<div className="grid 2xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 mt-10">
						{currentPageData.map(({ name, id, crest }) => (
							<Link to={`/teams/${id}`} key={id}>
								<Card areaName={name} name={name} emblem={crest} />
							</Link>
						))}
					</div>
					<Pagination
						className="mt-10"
						current={currentPage}
						total={filterDataList.length}
						pageSize={itemsPerPage}
						onChange={handleChangePage}
					/>
				</div>
			) : (
				<div className="mt-10">Нет данных</div>
			)}
		</div>
	);
};

export default TeamsPage;
