import { useCallback, useState } from 'react';
import Input from './Input';

const AuthPage = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	console.log(name, email, password);

	const [variant, setVariant] = useState('login');

	const toggleVariant = useCallback(() => {
		setVariant((currentVariant) =>
			currentVariant === 'login' ? 'register' : 'login'
		);
	}, []);

	return (
		<div className="relative h-screen w-full bg-[url('/src//assets//img//bg.jpg')] bg-center bg-no-repeat bg-cover bg-fixed">
			<div className="h-full w-full bg-black bg-opacity-50">
				<div className="flex justify-center">
					<div className="bg-zinc-200 p-14 mt-20 rounded-xl self-center lg:w-2/6">
						<h2 className="text-4xl mb-10 font-semibold">
							{variant === 'login' ? 'Войди' : 'Зарегайся'}
						</h2>
						<div className="flex flex-col gap-4">
							{variant === 'register' && (
								<Input
									id="name"
									value={name}
									label="Введите имя"
									onChange={(e) => setName(e.target.value)}
								/>
							)}
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
							{variant === 'login'
								? 'Первый раз на этой ебале?'
								: 'Да не пизди, ты был тут'}
							<span
								onClick={toggleVariant}
								className="ml-1 text-blue-500 hover:text-blue-400 cursor-pointer"
							>
								{variant === 'login' ? 'Зарегайся' : 'Вваливайся'}
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthPage;
