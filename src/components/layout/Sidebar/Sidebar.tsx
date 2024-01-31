import { LuLayoutList } from "react-icons/lu";
import { GrProjects } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import SidebarItem from "./SidebarItem";
import Box from "./Box";
import { useState } from "react";
import { SidebarNavigation } from "./SidebarNavigation/SidebarNavigation";

const sidebarItemsMain = [
	{
		id: 1,
		icon: LuLayoutList,
		label: "Задачи",
		activeItem: true,
	},
	{
		id: 2,
		icon: GrProjects,
		label: "Проекты",
		activeItem: true,
	},
];

export const Sidebar = () => {
	// const [activeItem, setActiveItem] = useState<number>(0)
	const [activeNavigation, setActiveNavigation] = useState<boolean>(false);

	const handleNavigate = () => {
		setActiveNavigation(true);
	};

	return (
		<div className='w-full h-full relative z-10'>
			<div className='w-[250px] h-full border-r-2 flex flex-col justify-start relative z-20 p-2'>
				<Box className='border-b-2 border-gray'>sd</Box>
				<Box className='h-full border-b-2 border-gray'>
					{sidebarItemsMain.map((item) => (
						<SidebarItem
							key={item.label}
							handleNavigate={handleNavigate}
							{...item}
						/>
					))}
				</Box>
				<Box className='mt-auto'>
					<SidebarItem
						label='Настройки'
						icon={IoMdSettings}
						handleNavigate={handleNavigate}
						activeItem={activeNavigation}
					/>
				</Box>
			</div>
			{activeNavigation && (
				<SidebarNavigation handleDisable={handleNavigate}>
					top
				</SidebarNavigation>
			)}
		</div>
	);
};
