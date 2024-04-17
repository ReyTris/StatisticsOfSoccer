export const formatDate = (
	date: string,
	variant: DateFormatVariant
): string => {
	const arrDate = date.split('T');
	switch (variant) {
		case 'date':
			return arrDate[0];
		default:
			return arrDate[1].slice(0, -1);
	}
};

export enum DateFormatVariant {
	Hours = 'hours',
	Date = 'date',
}
