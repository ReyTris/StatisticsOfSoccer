import { useLocation } from 'react-router-dom';
import { useGetMatchesData } from '../hooks/useGetData';

interface Props {
    selectorName: string;
    actionName: string
}


// HOC function
const withMatchesData = (WrappedComponent) => {
  return ({ selectorName, actionName }: Props) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/');
    const matchId = Number(pathnames.at(-1));
    const { dataList, isLoading } = useGetMatchesData(selectorName, actionName, matchId);

    return <WrappedComponent dataList={dataList} isLoading={isLoading}/>;
  };
};

export default withMatchesData;