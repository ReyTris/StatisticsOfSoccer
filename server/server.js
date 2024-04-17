import axios from 'axios';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';

const app = express();
const PORT = 3000;

app.use(
	cors({
		credentials: true,
		origin: 3578,
	})
);

export const $api = axios.create({
	withCredentials: true,
	baseURL: process.env.API_URL,
	headers: {
		'Content-Type': 'application/json',
		'X-Auth-Token': process.env.TOKEN,
	},
});

app.get('/teams', async (req, res) => {
	try {
		const { data } = await $api.get('/teams/');
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});
app.get('/competitions', async (req, res) => {
	try {
		const { data } = await $api.get('/competitions/');
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});
app.get('/competitions/matches/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const { data } = await $api.get(`/competitions/${id}/matches/`);
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});
app.get('/teams/matches/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const { data } = await $api.get(`/teams/${id}/matches/`);
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});
app.get('/teams/matches/:id/:dateFrom/:dateTo', async (req, res) => {
	const { id, dateFrom, dateTo } = req.params;
	try {
		const { data } = await $api.get(
			`/teams/${id}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`
		);
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});
app.get('/competitions/matches/:id/:dateFrom/:dateTo', async (req, res) => {
	const { id, dateFrom, dateTo } = req.params;
	try {
		const { data } = await $api.get(
			`/competitions/${id}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`
		);
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
