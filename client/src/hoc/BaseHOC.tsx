import { useGetMatchesData } from '../hooks/useGetData';

interface Props {
    selectorName: string;
    actionName: string
}

const withCompetitionsData = (WrappedComponent) => {
    return ({ selectorName, actionName }: Props) => {

        const { dataList, isLoading } = useGetMatchesData(
            selectorName,
            actionName
        );
  
      return <WrappedComponent dataList={dataList} isLoading={isLoading}/>;
    };
  };
  
  export default withCompetitionsData;