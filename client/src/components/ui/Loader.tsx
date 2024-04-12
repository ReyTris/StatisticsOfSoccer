import { LuLoader } from 'react-icons/lu';

interface LoaderProps {
	className?: string;
}

const Loader = ({ className }: LoaderProps) => {
	return (
		<div className={className}>
			<LuLoader className="w-full h-full animate-spin" />
		</div>
	);
};

export default Loader;
