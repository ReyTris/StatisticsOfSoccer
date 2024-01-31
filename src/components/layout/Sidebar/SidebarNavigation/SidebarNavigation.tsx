import React from "react"
import cn from "classnames"
import styles from "./SidebarNavigation.module.scss"

interface NavigationProps {
	children: React.ReactNode
	className?: string
	handleDisable: () => void
}

export const SidebarNavigation: React.FC<NavigationProps> = ({
	children,
	handleDisable,
}) => {
	return (
		<div className={cn("h-full w-full z-10 absolute top-0")}>
			<div className={cn(styles.backSide)} onClick={handleDisable}></div>
			<div className={cn(styles.showNavigate)}>{children}</div>
		</div>
	)
}
