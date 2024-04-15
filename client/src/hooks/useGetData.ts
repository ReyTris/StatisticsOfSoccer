import { useEffect, useState } from 'react';
import {
	IInitialState,
	IInitialStateData,
	allCompetitions,
	competitionMatches,
} from '../store/slices/competitionsSlice';
import { useAppDispatch, useAppSelector } from './useDispatch';

interface IActionCreators {
	competitionsDispatch: () => void;
	competitionMatchesDispatch: (id: number) => void;
}

const actionCreators = {
	competitionsDispatch: allCompetitions,
	competitionMatchesDispatch: competitionMatches,
};

export const useGetMatchesData = (
	nameSelector: string,
	nameAction: string,
	matchId?: number
) => {
	const [dataList, setDataList] = useState([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dispatch = useAppDispatch();

	const state: IInitialState = useAppSelector(
		(state) => state.competitionsReducer
	);
	const matchesList = state.data[nameSelector as keyof IInitialStateData];
	const loadingStatus = state.loading;

	useEffect(() => {
		if (matchId) {
			dispatch(actionCreators[nameAction as keyof IActionCreators](matchId));
		} else {
			dispatch(actionCreators[nameAction as keyof IActionCreators]());
		}
	}, [dispatch, matchId, nameAction]);

	useEffect(() => {
		setDataList(matchesList);
	}, [matchesList]);

	useEffect(() => {
		if (!loadingStatus && matchesList.length > 0) {
			setIsLoading(false);
		}
	}, [loadingStatus, matchesList]);

	return { dataList, isLoading };
};
