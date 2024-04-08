import axios from 'axios';

export const API_URL = `http://localhost:3000/api`;

export const $api = axios.create({
	withCredentials: true,
	baseURL: 'http://localhost:3000',
	headers: {
		'Content-Type': 'application/json',
		'X-Auth-Token': '359669d2034d4b95bf5d81c61262e5f4',
	},
});

// $api.interceptors.request.use((config) => {
// 	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
// 	return config;
// });
