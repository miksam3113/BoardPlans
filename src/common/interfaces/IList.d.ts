import ICardItem from 'common/interfaces/ICard';

interface IListItem {
	id: number;
	title: string;
	cards: ICardItem[];
	position: number;
	index: number;
}

export default IListItem;
