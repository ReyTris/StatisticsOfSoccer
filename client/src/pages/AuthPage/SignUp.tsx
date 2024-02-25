import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useDispatch';
import { registerUser } from '../../store/slices/userSlice';
import {} from '../../store/store';
import Input from './components/Input';

export const SignUp = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useAppDispatch();
	return (
		<>
			<h2 className="text-4xl mb-10 font-semibold">Регистрация</h2>
			<div className="flex flex-col gap-4">
				<Input
					id="name"
					value={name}
					label="Введите имя"
					onChange={(e) => setName(e.target.value)}
				/>
				<Input
					id="email"
					type="email"
					value={email}
					label="Введите email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					id="password"
					type="password"
					value={password}
					label="Введите пароль"
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>

			<p className="mt-10 text-neutral-500">
				Есть аккаунт
				<Link
					to="/auth/login"
					className="ml-1 text-blue-500 hover:text-blue-400 cursor-pointer"
				>
					Залогинься
				</Link>
			</p>

			<button onClick={() => dispatch(registerUser({ email, password, name }))}>
				Регистрация
			</button>
		</>
	);
};
