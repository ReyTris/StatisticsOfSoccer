import { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useDispatch';
import { checkAuth } from '../../store/slices/userSlice';
import { store } from '../../store/store';
import Sidebar from './Sidebar';

export const Layout: FC = () => {
	const dispatch = useAppDispatch();

	const state = store.getState();
	const navigate = useNavigate();
	const isAuth = useAppSelector((state) => state.userReducer.isAuth);

	console.log(state);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(checkAuth());
		}

		if (!isAuth) {
			navigate('/auth/login');
		}
	}, [navigate, isAuth]);

	return (
		<div className="h-screen bg-gray-300">
			<div className="h-full mx-auto xl:px-30">
				<Sidebar />
				<div className="">
					<Outlet />
				</div>
			</div>
		</div>
	);
};
