import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';
import { INavLink } from './types';

const navLinkData: INavLink[] = [
	{
		to: '/competitions',
		className: ``,
		label: 'Лиги',
	},
	{
		to: '/teams',
		className: ``,
		label: 'Команды',
	},
];

export const NavBar = () => {
	return (
		<nav className="flex">
			{navLinkData.map(({ to, label }: INavLink) => (
				<NavLink
					key={label}
					to={to}
					className={({ isActive }) =>
						`${styles.navLink} ${isActive ? styles.navActiveLink : ''}`
					}
				>
					{label}
				</NavLink>
			))}
		</nav>
	);
};
