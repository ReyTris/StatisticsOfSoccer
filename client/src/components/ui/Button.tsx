import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
	children,
	onClick,
	...rest
}: PropsWithChildren<IButtonProps>) => {
	return (
		<button className="" onClick={onClick} {...rest}>
			{children}
		</button>
	);
};

export default Button;
