import { default as cn } from 'classnames';
import { useEffect, useState } from 'react';
import { IoMdSettings } from 'react-icons/io';
import { AuthService } from '../../../services/auth/auth.service';
import Box from './Box';
import SidebarItem from './SidebarItem';
import { SidebarNavigation } from './SidebarNavigation/SidebarNavigation';
import { sidebarItemsMain } from './sidebar.data';

export const Sidebar = () => {
	const [activeItem, setActiveItem] = useState<number | boolean>(false);

	const handleNavigate = (state: number | boolean) => {
		setActiveItem(state);
	};
	useEffect(() => {
		const response = async () => {
			const data = await AuthService.register('nikita', '123456');

			console.log(data);
		};
		response();
	}, []);
	return (
		<div className="w-full h-full relative z-10">
			<div className="w-[250px] h-full border-r-2 flex flex-col justify-start relative z-20">
				<Box className="border-b-2 border-gray">sd</Box>
				<Box className="h-full border-b-2 border-gray">
					{sidebarItemsMain.map((item) => (
						<SidebarItem
							key={item.id}
							className={cn(activeItem === item.id && 'active')}
							handleNavigate={handleNavigate}
							{...item}
						/>
					))}
				</Box>
				<Box className="mt-auto">
					<SidebarItem label="Настройки" icon={IoMdSettings} />
				</Box>
			</div>
			{activeItem && (
				<SidebarNavigation handleNavigate={handleNavigate}>
					{activeItem}
				</SidebarNavigation>
			)}
		</div>
	);
};
