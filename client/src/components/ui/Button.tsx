import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

// interface IButtonProps extends ComponentPropsWithRef<HTMLButtonElement> {
// 	className?: string;
// 	onClick: (e: MouseEvent) => void;
// 	isDisabled?: boolean;
// }
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
