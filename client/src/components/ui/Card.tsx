interface CardProps {
	name: string;
	areaName: string;
	emblem: string;
}

export const Card = ({ name, areaName, emblem }: CardProps) => {
	return (
		<div className="group relative h-[220px] flex items-center justify-center">
			<div className="absolute w-full h-full flex items-center justify-center p-5">
				<img className="w-auto h-full object-cover" src={emblem} alt={name} />
			</div>
			<div className="absolute w-full h-full bg-black opacity-75 rounded-default group-hover:scale-105 transition-transform"></div>
			<div className="relative z-10 text-center text-white">
				<h3 className="text-xl font-bold">{name}</h3>
				<span>{areaName}</span>
			</div>
		</div>
	);
};
