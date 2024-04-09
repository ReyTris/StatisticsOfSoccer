import { NavItem } from '../ui/NavItem';

export const NavBar = () => {
	return (
		<div className="flex">
			<NavItem to="/competitions">Лиги</NavItem>
			<NavItem to="/teams">Команды</NavItem>
		</div>
	);
};
