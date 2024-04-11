import { AxiosResponse } from 'axios';
import { $api } from '../../api/axios';
import { ICompetitionsData } from '../../models/response/ICompetitionsResponse';

export const CompetitionsService = {
	async getAllCompetitions(): Promise<AxiosResponse<ICompetitionsData>> {
		return $api.get('/competitions');
	},
	async getCompetitionMatches(id: number): Promise<AxiosResponse> {
		return $api.get(`/competitions/matches/${id}`);
	},
	async getAllTeams(): Promise<AxiosResponse> {
		return $api.get('/teams');
	},
	async getTeamMatches(id: number): Promise<AxiosResponse> {
		return $api.get(`/teams/matches/${id}`);
	},
};
