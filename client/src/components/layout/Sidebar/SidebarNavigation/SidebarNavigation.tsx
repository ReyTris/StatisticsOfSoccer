import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { Search } from '../Search/Search';
import { ISidebarItemNavigation } from '../sidebar.data';
import styles from './SidebarNavigation.module.scss';
import { ITaskNavigation, mokeList } from './list.data';

interface NavigationProps {
	className?: string;
	handleNavigate: (state: boolean) => void;
	activeSidebarItem: ISidebarItemNavigation;
}

export const SidebarNavigation: React.FC<NavigationProps> = ({
	handleNavigate,
	activeSidebarItem,
}) => {
	const { type, searchPlaceholder } = activeSidebarItem;
	const [searchList, setSearchList] = useState<ITaskNavigation[]>([]);
	const searchHandler = (value: string) => {
		const resultSearch = mokeList[type].filter((result) => {
			return result.name.toLowerCase().includes(value);
		});
		setSearchList(resultSearch);
	};
	useEffect(() => {
		setSearchList(mokeList[type]);
	}, [type]);
	return (
		<div className={cn('h-full w-full z-10 absolute top-0')}>
			<div
				className={cn(styles.backSide)}
				onClick={() => handleNavigate(false)}
			></div>
			<div className={cn(styles.showNavigate)}>
				<div>
					{searchPlaceholder && (
						<Search
							placeholder={searchPlaceholder}
							searchHandler={searchHandler}
						/>
					)}
				</div>

				<div>
					{searchList.map((item: ITaskNavigation) => (
						<div key={item.id}>
							<span>{item.name}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
