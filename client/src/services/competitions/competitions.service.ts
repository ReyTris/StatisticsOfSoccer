import { AxiosResponse } from 'axios';
import { $api } from '../../api/axios';

export const CompetitionsService = {
	async getAllCompetitions(): Promise<AxiosResponse> {
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
