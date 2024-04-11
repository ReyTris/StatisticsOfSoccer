import { FC } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchFieldProps {
	searchHandler: (value: string) => void;
	placeholder: string;
}

const SearchField: FC<SearchFieldProps> = ({ placeholder, searchHandler }) => {
	return (
		<div className="flex items-center h-[40px] max-w-[200px] px-5 rounded-default border-2">
			<FaSearch className="mr-2" />
			<input
				className="w-full bg-transparent focus:outline-none"
				type="text"
				placeholder={placeholder}
				onChange={(e) => searchHandler(e.target.value)}
			/>
		</div>
	);
};

export default SearchField;
