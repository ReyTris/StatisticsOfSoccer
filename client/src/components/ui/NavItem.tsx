import cn from 'classnames';
import { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

interface NavItemProps {
	to: string;
	className?: string;
}

export const NavItem = ({
	to,
	className,
	children,
}: PropsWithChildren<NavItemProps>) => {
	return (
		<NavLink to={to} className={cn(className, '')}>
			{children}
		</NavLink>
	);
};
