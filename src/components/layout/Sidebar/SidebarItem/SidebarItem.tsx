import React from "react";
import styles from "./Sidebar.module.scss";
import { IconType } from "react-icons";
import cn from "classnames";

interface SidebarItemsProps {
	icon: IconType;
	label: string;
	activeItem: boolean;
	handleNavigate: () => void;
}

export const SidebarItem: React.FC<SidebarItemsProps> = ({
	label,
	icon: Icon,
	handleNavigate,
	activeItem,
}) => {
	return (
		<div
			className={cn(
				styles.sidebarItem,
				"sidebar-item flex items-center px-5 cursor-pointer transition py-2"
			)}
			onClick={handleNavigate}
		>
			<Icon />
			<p className='ml-3'>
				{label} {activeItem}
			</p>
			<div className='px-2'></div>
		</div>
	);
};
