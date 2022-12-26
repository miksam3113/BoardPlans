import IListItem from 'common/interfaces/IList';

export interface IPageBoard {
	lists: IListItem[];
	title: string;
	id: number;
	custom: string;
}
