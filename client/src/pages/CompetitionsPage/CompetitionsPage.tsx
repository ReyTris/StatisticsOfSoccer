import { useEffect, useState } from 'react';
import SearchField from '../../components/ui/SearchField';
import { useAppDispatch, useAppSelector } from '../../hooks/useDispatch';
import { ICompetition } from '../../models/response/ICompetitionsResponse';
import { allCompetitions } from '../../store/slices/competitionsSlice';

const CompetitionsPage = () => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [competitionsList, setCompetitionsList] = useState<ICompetition[]>([]);
    const dispatch = useAppDispatch()

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

	console.log(competitionsList)

	return (
		<div>
			<SearchField
				placeholder="Поиск лиг"
				searchHandler={searchHandler}
			></SearchField>

			<div className='grid 2xl:grid-cols-3 xl:grid-cols-2 md:grid-cols-1'>
				{(
					competitionsList.map(({id, name, area}) => 
						<div key={id}>
							<h2>{name}</h2>
							<span>{area.name}</span>
						</div>
					)
				)}
			</div>
		</div>
	);
};

export default CompetitionsPage;
