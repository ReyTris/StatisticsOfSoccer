import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useDispatch';
import { useGetMatchesData } from '../hooks/useGetData';
import { ICompetitionMatch } from '../models/response/ICompetitionsMatches';
import {
	IInitialState,
	teamMatchesDate,
} from '../store/slices/competitionsSlice';

interface HocProps {
	selectorName: string;
	actionName: string;
}

// HOC function
const withMatchesData = (WrappedComponent) => {
	return ({ selectorName, actionName }: HocProps) => {
		const location = useLocation();
		const pathnames = location.pathname.split('/');
		const matchId = Number(pathnames.at(-1));

		const [updateData, setUpdateData] = useState<ICompetitionMatch[]>([]);
		const dispatch = useAppDispatch();

		const state: IInitialState = useAppSelector(
			(state) => state.competitionsReducer
		);
		const { dataList, isLoading } = useGetMatchesData(
			selectorName,
			actionName,
			matchId
		);

		const [pickDate, setPickDate] = useState<string[]>([]);

		const startDateHandler = (dateString) => {
			setPickDate(dateString);
		};

		useEffect(() => {
			setUpdateData(dataList);
		}, [dataList]);

		useEffect(() => {
			dispatch(
				teamMatchesDate({
					id: matchId,
					dateFrom: pickDate[0],
					dateTo: pickDate[1],
				})
			);
			setUpdateData(state.data.teamMatchesDate);
			console.log(pickDate);
			console.log(state.data);
		}, [pickDate]);

		return (
			<WrappedComponent
				dataList={updateData}
				isLoading={isLoading}
				startDateHandler={startDateHandler}
			/>
		);
	};
};

export default withMatchesData;
