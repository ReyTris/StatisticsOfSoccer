import { default as cn } from "classnames";
import { useState } from "react";
import { GrProjects } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import { LuLayoutList } from "react-icons/lu";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import { SidebarNavigation } from "./SidebarNavigation/SidebarNavigation";

const sidebarItemsMain = [
	{
		id: 1,
		icon: LuLayoutList,
		label: "Задачи",
	},
	{
		id: 2,
		icon: GrProjects,
		label: "Проекты",
	},
];

export const Sidebar = () => {
	const [activeNavigation, setActiveNavigation] = useState<boolean>(false);
	const [activeItem, setActiveItem] = useState<number>(0)

	const handleNavigate = (id: number) => {
		setActiveNavigation(true);
		setActiveItem(id)
	};

	const closeNavigate = () => {
		setActiveNavigation(false);
	}

	return (
		<div className='w-full h-full relative z-10'>
			<div className='w-[250px] h-full border-r-2 flex flex-col justify-start relative z-20'>
				<Box className='border-b-2 border-gray'>sd</Box>
				<Box className='h-full border-b-2 border-gray'>
					{sidebarItemsMain.map((item) => (
						<SidebarItem
							key={item.id}
							className={cn(activeItem === item.id && 'active')}
							handleNavigate={handleNavigate}
							{...item}
						/>
					))}
				</Box>
				<Box className='mt-auto'>
					<SidebarItem
						label='Настройки'
						icon={IoMdSettings}
					/>
				</Box>
			</div>
			{activeNavigation && (
				<SidebarNavigation
					closeNavigate = {closeNavigate}
				>
					top
				</SidebarNavigation>
			)}
		</div>
	);
};
