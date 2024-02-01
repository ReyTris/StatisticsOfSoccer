import cn from "classnames";
import React from "react";
import styles from "./SidebarNavigation.module.scss";

interface NavigationProps {
	children: React.ReactNode;
	className?: string;
	handleNavigate: (state: boolean) => void;
}

export const SidebarNavigation: React.FC<NavigationProps> = ({
	handleNavigate,
	children,
}) => {
	return (
		<div className={cn("h-full w-full z-10 absolute top-0")}>
			<div
				className={cn(styles.backSide)}
				onClick={() => handleNavigate(false)}
			></div>
			<div className={cn(styles.showNavigate)}>{children}</div>
		</div>
	);
};
