import { useEffect, useState } from 'react';
import { actionCreators } from '../store/slices/actionCreators';
import {
	IInitialState,
	IInitialStateData,
} from '../store/slices/competitionsSlice';
import { IActionCreators, IActionCreatorsById } from '../store/slices/types';
import { useAppDispatch, useAppSelector } from './useDispatch';

export const useGetMatchesData = (
	nameSelector: string,
	nameAction: string,
	isNameCompetition?: boolean,
	matchId?: number
) => {
	const [dataList, setDataList] = useState<any>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dispatch = useAppDispatch();

	const state: IInitialState = useAppSelector(
		(state) => state.competitionsReducer
	);
	const matchesList = state.data[nameSelector as keyof IInitialStateData];
	const loadingStatus = state.loading;
	const nameTeam = isNameCompetition && state.data.nameTeam;

	useEffect(() => {
		if (matchId) {
			dispatch(
				actionCreators[nameAction as keyof IActionCreatorsById](matchId)
			);
		} else {
			dispatch(actionCreators[nameAction as keyof IActionCreators]());
		}
	}, [dispatch, matchId, nameAction]);

	useEffect(() => {
		setDataList(matchesList);
	}, [matchesList]);

	useEffect(() => {
		if (loadingStatus === false && matchesList.length > 0) {
			setIsLoading(false);
		}
	}, [loadingStatus, matchesList]);

	return { dataList, isLoading, nameTeam };
};
