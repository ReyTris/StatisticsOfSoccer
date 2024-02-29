import { default as cn } from 'classnames';
import { useState } from 'react';
import { IoMdSettings } from 'react-icons/io';
import { useAppDispatch } from '../../../hooks/useDispatch';
import { logoutUser } from '../../../store/slices/userSlice';
import Box from './Box';
import SidebarItem from './SidebarItem';
import { SidebarNavigation } from './SidebarNavigation/SidebarNavigation';
import { ISidebarItem, sidebarItemsMain } from './sidebar.data';

export const Sidebar = () => {
	const [activeItem, setActiveItem] = useState<{
		state: number | boolean;
		data: ISidebarItem;
	}>({ state: false, data: {} as ISidebarItem });

	const handleNavigate = (state: number | boolean) => {
		const itemData = sidebarItemsMain.filter((item) => item.id === state);

		setActiveItem({
			state,
			data: itemData[0],
		});
	};

	const dispatch = useAppDispatch();

	return (
		<div className="w-full h-full relative z-10">
			<div className="w-[250px] h-full border-r-2 flex flex-col justify-start relative z-20">
				<Box className="border-b-2 border-gray">sd</Box>
				<Box className="h-full border-b-2 border-gray">
					{sidebarItemsMain.map((item) => (
						<SidebarItem
							key={item.id}
							className={cn(activeItem.state === item.id && 'active')}
							handleNavigate={handleNavigate}
							{...item}
						/>
					))}
				</Box>
				<Box className="mt-auto">
					<SidebarItem label="Настройки" icon={IoMdSettings} />
					<SidebarItem
						label="Выйти"
						handleNavigate={() => dispatch(logoutUser())}
						icon={IoMdSettings}
					/>
				</Box>
			</div>
			{activeItem.state && (
				<SidebarNavigation
					activeSidebarItem={activeItem.data}
					handleNavigate={handleNavigate}
				/>
			)}
		</div>
	);
};
