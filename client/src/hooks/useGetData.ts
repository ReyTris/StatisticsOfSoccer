import { useEffect, useState } from 'react';
import {
	IInitialState,
	IInitialStateData,
	allCompetitions,
	allTeams,
	competitionMatches,
	competitionMatchesDate,
	teamMatches,
	teamMatchesDate,
} from '../store/slices/competitionsSlice';
import { useAppDispatch, useAppSelector } from './useDispatch';

export interface IParamsDate {
	id: number;
	dateFrom: string;
	dateTo: string;
}

export interface IActionCreators {
	competitionsAction: () => void;
	teamsAction: () => void;
}
export interface IActionCreatorsById {
	competitionMatchesAction: (id: number) => void;
	teamMatchesAction: (id: number) => void;
}
export interface IActionCreatorsByDate {
	teamMatchesByDateAction: (data: IParamsDate) => void;
	competitionMatchesByDateAction: (data: IParamsDate) => void;
}

export const actionCreators = {
	competitionsAction: allCompetitions,
	competitionMatchesAction: competitionMatches,
	teamsAction: allTeams,
	teamMatchesAction: teamMatches,
	teamMatchesByDateAction: teamMatchesDate,
	competitionMatchesByDateAction: competitionMatchesDate,
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

	return { dataList, isLoading };
};
