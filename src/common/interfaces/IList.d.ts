interface IListItem {
	id: number;
	title: string;
	cards: {
		id: number;
		title: string;
	}[];
	position: number;
}

export default IListItem;
