import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import SearchField from '../../components/ui/SearchField';
import { useAppDispatch, useAppSelector } from '../../hooks/useDispatch';
import { ICompetition } from '../../models/response/ICompetitionsResponse';
import { allCompetitions } from '../../store/slices/competitionsSlice';

const CompetitionsPage = () => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [competitionsList, setCompetitionsList] = useState<ICompetition[]>([]);
	const dispatch = useAppDispatch();

	const searchHandler = (value: string) => {
		setSearchValue(value);
	};

	const dataComp = useAppSelector((state) => state.competitionsReducer.data);

	useEffect(() => {
		dispatch(allCompetitions());
	}, []);

	useEffect(() => {
		setCompetitionsList(dataComp);
	}, [dataComp]);

	console.log(competitionsList);

	return (
		<div>
			<SearchField
				placeholder="Поиск лиги"
				searchHandler={searchHandler}
			></SearchField>

			<div className="grid 2xl:grid-cols-3 xl:grid-cols-2 md:grid-cols-1 gap-10">
				{competitionsList.map(({ name, id, emblem, area }) => (
					<Link to={'/'}>
						<Card key={id} areaName={area.name} name={name} emblem={emblem} />
					</Link>
				))}
			</div>

			<Pagination defaultCurrent={6} total={10} />
		</div>
	);
};

export default CompetitionsPage;
