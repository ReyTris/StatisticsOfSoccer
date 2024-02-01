import { default as cn } from "classnames";
import React from "react";
import { IconType } from "react-icons";
import styles from "./Sidebar.module.scss";

interface SidebarItemsProps {
	id?: number | undefined,
	icon: IconType;
	label: string;
	handleNavigate?: (id: number) => void;
	className?: string;
}

export const SidebarItem: React.FC<SidebarItemsProps> = ({
	id,
	label,
	icon: Icon,
	handleNavigate,
	className
}) => {

	return (
		<div
			className={cn(
				styles.sidebarItem,
				"sidebar-item flex items-center px-5 cursor-pointer transition py-2",
				styles[className!]
			)}
			onClick={() => handleNavigate!(id!)}
		>
			<Icon />
			<p className='ml-3'>
				{label}
			</p>
			<div className='px-2'></div>
		</div>
	);
};
