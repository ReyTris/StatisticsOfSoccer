import { Breadcrumb, DatePicker, Space, Table } from 'antd';
import { memo } from 'react';
import Loader from '../../components/ui/Loader';
import { customStatus, tableColumns } from '../../constants/table.columns';
import { breadCrumbMap } from '../../helpers/breadCrumbMap';
import { DateFormatVariant, formatDate } from '../../helpers/formatDate';
import { IMatch } from '../../models/response/ICompetitionsMatches';
import { DetailPageProps, ITableData } from './types';
const { RangePicker } = DatePicker;
const DetailPage = memo(
	({ dataList, isLoading, dateHandler, nameTeam }: DetailPageProps) => {
		const dataMap = dataList.map((item: IMatch, index: number): ITableData => {
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
		});

		const breadCrumbRoute = breadCrumbMap(nameTeam);

		if (isLoading) {
			return (
				<Loader className="absolute w-[200px] h-[200px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
			);
		}

		return (
			<div>
				{nameTeam && (
					<div className="mt-5">
						<Breadcrumb separator="/" items={breadCrumbRoute} />
					</div>
				)}

				<div className="mt-10">
					<Space direction="vertical" size={5}>
						<RangePicker
							onChange={(value, dateString) => {
								dateHandler(dateString);
							}}
						/>
					</Space>
				</div>

				<div className="mt-5">
					<Table
						dataSource={dataMap}
						columns={tableColumns}
						scroll={{ x: 1000, y: '100%' }}
					/>
				</div>
			</div>
		);
	}
);

export default DetailPage;
