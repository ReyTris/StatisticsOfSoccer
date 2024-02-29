import cn from 'classnames';
import React from 'react';
import { Search } from '../Search/Search';
import { ISidebarItem } from '../sidebar.data';
import styles from './SidebarNavigation.module.scss';

interface NavigationProps {
	className?: string;
	handleNavigate: (state: boolean) => void;
	activeSidebarItem: ISidebarItem;
}

export const SidebarNavigation: React.FC<NavigationProps> = ({
	handleNavigate,
	activeSidebarItem,
}) => {
	return (
		<div className={cn('h-full w-full z-10 absolute top-0')}>
			<div
				className={cn(styles.backSide)}
				onClick={() => handleNavigate(false)}
			></div>
			<div className={cn(styles.showNavigate)}>
				{activeSidebarItem.searchPlaceholder && (
					<Search
						placeholder={activeSidebarItem.searchPlaceholder}
						searchHandler={() => null}
					/>
				)}
			</div>
		</div>
	);
};
