interface InputProps {
	id: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	label: string;
	type?: string;
}

const Input: React.FC<InputProps> = ({ id, onChange, value, label, type }) => {
	return (
		<div className="relative">
			<input
				className="
                    block w-full
                    rounded-md
                    px-6
                    pb-2
                    pt-5
                    mb-2
                    text-md
                    focus:outline-none
                    focus:ring-0
                    peer
                "
				id={id}
				value={value}
				type={type}
				onChange={onChange}
				placeholder=""
			/>
			<label
				className="
                    absolute
                    text-md
                    top-4
                    transform
                    duration-150
                    -translate-y-3
                    scale-75
                    left-6
                    origin-[0]
                    peer-placeholder-shown:scale-100
                    peer-placeholder-shown:translate-y-0
                    peer-focus:scale-75
                    peer-focus:-translate-y-3
                "
				htmlFor={id}
			>
				{label}
			</label>
		</div>
	);
};

export default Input;
