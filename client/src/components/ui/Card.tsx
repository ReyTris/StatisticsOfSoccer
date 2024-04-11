interface CardProps {
	id: string;
	name: string;
	areaName: string;
}

export const Card = ({ name, areaName, id }: CardProps) => {
	return (
		<div className="" key={id}>
			<h2>{name}</h2>
			<span>{areaName}</span>
		</div>
	);
};
