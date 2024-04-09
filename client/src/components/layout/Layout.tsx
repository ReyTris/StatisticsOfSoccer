import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useDispatch';
import { allCompetitions } from '../../store/slices/competitionsSlice';
import Button from '../ui/Button';
import { NavItem } from '../ui/NavItem';

function Layout() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		navigate('/competitions');
		dispatch(allCompetitions());
	}, [dispatch, navigate]);

	const dataComp = useAppSelector((state) => state.competitionsReducer.data);

	console.log(dataComp);
	return (
		<div>
			<Outlet />
			<Button onClick={(e) => console.log(e.target)}>Click</Button>
			<NavItem to="/">asdf</NavItem>
		</div>
	);
}

export default Layout;
