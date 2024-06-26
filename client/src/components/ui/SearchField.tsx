import { FC, memo, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchFieldProps {
	searchHandler: (value: string) => void;
	placeholder: string;
}

const SearchField: FC<SearchFieldProps> = memo(
	({ placeholder, searchHandler }) => {
		const inputRef = useRef<HTMLInputElement>(null);
		useEffect(() => {
			if (inputRef.current) {
				inputRef.current.focus();
			}
		}, []);

		return (
			<div className="flex items-center mt-5 h-[40px] max-w-[200px] px-5 rounded-default border-2">
				<FaSearch className="mr-2" />
				<input
					ref={inputRef}
					className="w-full bg-transparent focus:outline-none"
					type="text"
					placeholder={placeholder}
					onChange={(e) => searchHandler(e.target.value)}
				/>
			</div>
		);
	}
);

export default SearchField;
