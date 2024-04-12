import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';
import SearchField from '../../components/ui/SearchField';
import { useAppDispatch, useAppSelector } from '../../hooks/useDispatch';
import { allCompetitions } from '../../store/slices/competitionsSlice';

const CompetitionsPage = () => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [currentPage, setCurrentPage] = useState<number>(1);
	const itemsPerPage = 6;
	const dispatch = useAppDispatch();

	const searchHandler = (value: string) => {
		setSearchValue(value);
	};

	const { data: competitionsList, loading: loadingStatus } = useAppSelector(
		(state) => state.competitionsReducer
	);

	useEffect(() => {
		dispatch(allCompetitions());
	}, []);

	const handleChangePage = (page: number) => {
		setCurrentPage(page);
	};

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentPageData = competitionsList.slice(startIndex, endIndex);

	console.log(competitionsList);

	if (loadingStatus) {
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

			<div className="grid 2xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 mt-10">
				{currentPageData.map(({ name, id, emblem, area }) => (
					<Link to={'/'}>
						<Card key={id} areaName={area.name} name={name} emblem={emblem} />
					</Link>
				))}
			</div>

			<Pagination
				className="mt-10"
				current={currentPage}
				total={competitionsList.length}
				pageSize={itemsPerPage}
				onChange={handleChangePage}
			/>
		</div>
	);
};

export default CompetitionsPage;
