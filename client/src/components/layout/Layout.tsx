import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header';

function Layout() {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (location.pathname == '/') {
			navigate('/competitions');
		}
	}, [location.pathname, navigate]);

	return (
		<div className="m-0 m-auto p-10 max-w-screen-2xl">
			<Header />
			<Outlet />
		</div>
	);
}

export default Layout;
