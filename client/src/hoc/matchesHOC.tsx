import { useLocation } from 'react-router-dom';
import { useGetMatchesData } from '../hooks/useGetData';

interface HocProps {
	selectorName: string;
	actionName: string;
}

// HOC function
const withMatchesData = (WrappedComponent) => {
	return ({ selectorName, actionName }: HocProps) => {
		const location = useLocation();
		const pathnames = location.pathname.split('/');
		const matchId = Number(pathnames.at(-1));
		const { dataList, isLoading } = useGetMatchesData(
			selectorName,
			actionName,
			matchId
		);

		return <WrappedComponent dataList={dataList} isLoading={isLoading} />;
	};
};

export default withMatchesData;
