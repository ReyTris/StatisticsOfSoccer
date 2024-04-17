import { useEffect, useState } from 'react';
import { IMatch } from '../models/response/ICompetitionsMatches';
import { actionCreators } from '../store/slices/actionCreators';
import { IInitialState } from '../store/slices/competitionsSlice';
import { IActionCreatorsByDate } from '../store/slices/types';
import { useAppDispatch, useAppSelector } from './useDispatch';

export const useGetCalendarData = (
	pickDate: string[],
	matchId: number,
	actionNameByDate: string
) => {
	const [matchDataByDate, setMatchDataByDate] = useState<IMatch[]>([]);
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
	}, [actionNameByDate, dispatch, matchId, pickDate]);

	useEffect(() => {
		setMatchDataByDate(matches);
	}, [matches]);

	return { matchDataByDate, loadingByDate };
};
