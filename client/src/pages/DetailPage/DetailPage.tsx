import { Breadcrumb, DatePicker, Space, Table } from 'antd';
import { memo } from 'react';
import Loader from '../../components/ui/Loader';
import { CompetitionsBreadcrumbRoute } from '../../constants/breadcrumbs.routes';
import { customStatus, tableColumns } from '../../constants/table.columns';
import { DateFormatVariant, formatDate } from '../../helpers/formatDate';
import { ICompetitionMatch } from '../../models/response/ICompetitionsMatches';
import { ITableData } from './types'; // Импортируем HOC
const { RangePicker } = DatePicker;

const DetailPage = memo(({ dataList, isLoading, startDateHandler }) => {
	const dataMap = dataList.map(
		(item: ICompetitionMatch, index: number): ITableData => {
			return {
				key: index,
				date: formatDate(item.utcDate, DateFormatVariant.Date),
				time: formatDate(item.utcDate, DateFormatVariant.Hours),
				status: customStatus[item.status],
				homeTeam: item.homeTeam,
				separator: '-',
				awayTeam: item.awayTeam,
				score: item.score,
			};
		}
	);

	if (isLoading) {
		return (
			<Loader className="absolute w-[200px] h-[200px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
		);
	}

	return (
		<div>
			<div>
				<Breadcrumb separator="/" items={CompetitionsBreadcrumbRoute} />
			</div>

			<div className="mt-10">
				<Space direction="vertical" size={5}>
					<RangePicker
						onChange={(value, dateString) => {
							startDateHandler(dateString);
						}}
					/>
				</Space>
			</div>

			<div className="mt-5">
				<Table dataSource={dataMap} columns={tableColumns} />
			</div>
		</div>
	);
});

export default DetailPage;
