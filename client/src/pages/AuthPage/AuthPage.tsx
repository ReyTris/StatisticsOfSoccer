import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useDispatch';

const AuthPage = () => {
	const navigate = useNavigate();
	const isAuth = useAppSelector((state) => state.userReducer.isAuth);
	useEffect(() => {
		if (isAuth) {
			navigate('/');
		}
	}, [navigate, isAuth]);
	return (
		<div className="relative h-screen w-full bg-[url('/src//assets//img//bg.jpg')] bg-center bg-no-repeat bg-cover bg-fixed">
			<div className="h-full w-full bg-black bg-opacity-50">
				<div className="flex justify-center">
					<div className="bg-zinc-200 p-14 mt-20 rounded-xl self-center lg:w-2/6">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthPage;
