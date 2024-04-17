import { useEffect, useState } from 'react';
import { ICompetitionMatch } from '../models/response/ICompetitionsMatches';
import { IInitialState } from '../store/slices/competitionsSlice';
import { useAppDispatch, useAppSelector } from './useDispatch';
import { IActionCreatorsByDate, actionCreators } from './useGetData';

export const useGetCalendarData = (
	pickDate: string[],
	matchId: number,
	actionNameByDate: string
) => {
	const [matchDataByDate, setMatchDataByDate] = useState<ICompetitionMatch[]>(
		[]
	);
	const dispatch = useAppDispatch();
	const state: IInitialState = useAppSelector(
		(state) => state.competitionsReducer
	);
	const matches = state.data.matches;
	const loadingByDate = state.loading;

	useEffect(() => {
		if (pickDate.length) {
			dispatch(
				actionCreators[actionNameByDate as keyof IActionCreatorsByDate]({
					id: matchId,
					dateFrom: pickDate[0],
					dateTo: pickDate[1],
				})
			);
		}
	}, [dispatch, pickDate]);

	useEffect(() => {
		setMatchDataByDate(matches);
	}, [matches]);

	return { matchDataByDate, loadingByDate };
};
