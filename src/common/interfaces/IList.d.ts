interface IListItem {
	id: number;
	title: string;
	cards: {
		id: number;
		title: string;
	}[];
}

export default IListItem;
