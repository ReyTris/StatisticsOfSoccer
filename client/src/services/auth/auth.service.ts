import { axiosDefault } from '../../api/axios';

export const AuthService = {
    async login(email: string, password: string) {
		const response = await axiosDefault.post('/login', {
			email,
			password,
		});

		return response.data;
	},
	async register(email: string, password: string) {
		const response = await axiosDefault.post('/register', {
			email,
			password,
		});

		return response.data;
	},
};
