import ICardItem from 'common/interfaces/ICard';

export function comparePositionCard(a: ICardItem, b: ICardItem): number {
	if (a.position < b.position) return -1;
	if (a.position > b.position) return 1;
	return 0;
}
