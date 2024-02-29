import { FC } from 'react';
import { FaSearch } from 'react-icons/fa';

interface ISearch {
	searchHandler: () => void;
	placeholder: string;
}

export const Search: FC<ISearch> = ({ searchHandler, placeholder }) => {
	return (
		<div className="h-[40px] px-[20px] border-2 rounded-default flex items-center">
			<FaSearch className="mr-2" />
			<input
				className="w-full bg-transparent focus:outline-none"
				type="text"
				onChange={searchHandler}
				placeholder={placeholder}
			/>
		</div>
	);
};
