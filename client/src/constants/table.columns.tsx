import { ColumnType } from 'antd/es/table';
import React from 'react';
import { IScore, ITableData, ITeam } from '../pages/DetailPage/types';

interface ITableColumns extends ColumnType<ITableData> {
	title: string;
	dataIndex: string;
	key: string;
	render?: (
		value: IScore & ITeam,
		record: ITableData,
		index: number
	) => React.ReactNode;
}

export const tableColumns: ITableColumns[] = [
	{
		title: 'Дата',
		dataIndex: 'date',
		key: 'date',
	},
	{
		title: 'Время',
		dataIndex: 'time',
		key: 'time',
	},
	{
		title: 'Статус',
		dataIndex: 'status',
		key: 'status',
	},
	{
		title: 'Домашняя команда',
		dataIndex: 'homeTeam',
		key: 'homeTeam',
		render: (homeTeam: ITeam) => {
			return (
				<div className="flex items-center">
					<img
						className="w-4 h-4 mr-3"
						src={homeTeam.crest}
						alt={homeTeam.name}
					/>
					{homeTeam.name}
				</div>
			);
		},
	},
	{
		title: '',
		dataIndex: 'separator',
		key: 'separator',
	},
	{
		title: 'Гостевая команда',
		dataIndex: 'awayTeam',
		key: 'awayTeam',
		render: (awayTeam: ITeam) => {
			return (
				<div className="flex items-center">
					<img
						className="w-4 h-4 mr-3"
						src={awayTeam.crest}
						alt={awayTeam.name}
					/>
					{awayTeam.name}
				</div>
			);
		},
	},
	{
		title: 'Счет (доп.время)',
		dataIndex: 'score',
		key: 'score',
		render: (score: IScore) => {
			if (score.winner !== null) {
				return `${score.fullTime.home} - ${score.fullTime.away} (${score.fullTime.home} - ${score.fullTime.away})`;
			} else {
				return 'N/A';
			}
		},
	},
];

export const customStatus: { [key: string]: string } = {
	SCHEDULED: 'Запланирован',
	LIVE: 'В прямом эфире',
	IN_PLAY: 'В игре',
	PAUSED: 'Пауза',
	FINISHED: 'Завершен',
	POSTPONED: 'Отложен',
	SUSPENDED: 'Приостановлен',
	CANCELED: 'Отменен',
};
