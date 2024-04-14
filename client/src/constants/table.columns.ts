import { ColumnType } from 'antd/es/table';
import { IScore, ITableData } from '../pages/DetailPage/types';

interface ITableColumns extends ColumnType<ITableData> {
	title: string;
	dataIndex: string;
	key: string;
	render?: (
		value: IScore,
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
