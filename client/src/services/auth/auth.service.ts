import { AxiosResponse } from 'axios';
import { $api } from '../../api/axios';
import { IAuthResponse } from '../../models/response/IAuthResponse';

export const AuthService = {
	async login(
		email: string,
		password: string
	): Promise<AxiosResponse<IAuthResponse>> {
		return $api.post('/login', {
			email,
			password,
		});
	},
	async register(
		email: string,
		password: string,
		name?: string
	): Promise<AxiosResponse<IAuthResponse>> {
		return $api.post('/register', {
			name,
			email,
			password,
		});
	},
	async logout(): Promise<void> {
		$api.post('/logout');
	},
};
