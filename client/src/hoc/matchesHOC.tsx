import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetCalendarData } from '../hooks/useGetCalendarData';
import { useGetMatchesData } from '../hooks/useGetData';
import { IMatch } from '../models/response/ICompetitionsMatches';

interface HocProps {
	selectorName: string;
	actionName: string;
	actionNameByDate: string;
	isNameCompetition?: boolean;
}

// HOC function
const withMatchesData = (WrappedComponent: any) => {
	return ({
		selectorName,
		actionName,
		actionNameByDate,
		isNameCompetition,
	}: HocProps) => {
		const location = useLocation();
		const pathnames = location.pathname.split('/');
		const matchId = Number(pathnames.at(-1));

		const [pickDate, setPickDate] = useState<string[]>([]);

		const [updateData, setUpdateData] = useState<IMatch[]>([]);

		//Получение общего списка матчей лиги или команды
		const { dataList, isLoading, nameTeam } = useGetMatchesData(
			selectorName,
			actionName,
			isNameCompetition,
			matchId
		);

		//Получение списка матчей по календарю
		const { matchDataByDate } = useGetCalendarData(
			pickDate,
			matchId,
			actionNameByDate
		);

		const dateHandler = (dateString: string[]) => {
			setPickDate(dateString);
		};

		useEffect(() => {
			if (matchDataByDate.length > 0) {
				setUpdateData(matchDataByDate);
			} else {
				setUpdateData(dataList);
			}
		}, [dataList, matchDataByDate]);
		return (
			<WrappedComponent
				dataList={updateData}
				isLoading={isLoading || !updateData.length}
				dateHandler={dateHandler}
				nameTeam={nameTeam}
			/>
		);
	};
};

export default withMatchesData;
