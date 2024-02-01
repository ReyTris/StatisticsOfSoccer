import cn from "classnames"
import React from "react"
import styles from "./SidebarNavigation.module.scss"

interface NavigationProps {
	children: React.ReactNode
	className?: string
	closeNavigate: () => void;
}

export const SidebarNavigation: React.FC<NavigationProps> = ({
	closeNavigate,
	children,
}) => {
	return (
		<div className={cn("h-full w-full z-10 absolute top-0")}>
			<div className={cn(styles.backSide)} onClick={closeNavigate}></div>
			<div className={cn(styles.showNavigate)}>{children}</div>
		</div>
	)
}
