import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetCalendarData } from '../hooks/useGetCalendarData';
import { useGetMatchesData } from '../hooks/useGetData';
import { ICompetitionMatch } from '../models/response/ICompetitionsMatches';

interface HocProps {
	selectorName: string;
	actionName: string;
	actionNameByDate: string;
}

// HOC function
const withMatchesData = (WrappedComponent) => {
	return ({ selectorName, actionName, actionNameByDate }: HocProps) => {
		const location = useLocation();
		const pathnames = location.pathname.split('/');
		const matchId = Number(pathnames.at(-1));

		const [pickDate, setPickDate] = useState<string[]>([]);

		const [updateData, setUpdateData] = useState<ICompetitionMatch[]>([]);

		//Получение общего списка матчей лиги или команды
		const { dataList, isLoading } = useGetMatchesData(
			selectorName,
			actionName,
			matchId
		);

		//Получение списка матчей по календарю
		const { matchDataByDate } = useGetCalendarData(
			pickDate,
			matchId,
			actionNameByDate
		);

		const startDateHandler = (dateString: string[]) => {
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
				startDateHandler={startDateHandler}
			/>
		);
	};
};

export default withMatchesData;
