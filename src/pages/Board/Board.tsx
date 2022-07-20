/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable react/no-unused-state */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import './components/Board/board.scss';
import { List } from './components/List/List';
import IListItem from '../../common/interfaces/IList';

type propsType = {
	title: string;
	lists: IListItem[];
};
type stateType = {};

class Board extends React.Component<stateType, propsType> {
	constructor(props: propsType) {
		super(props);
		this.state = {
			title: 'Моя тестовая доска',
			lists: [
				{
					id: 1,
					title: 'Планы',
					cards: [
						{ id: 1, title: 'помыть кота' },
						{ id: 2, title: 'приготовить суп' },
						{ id: 3, title: 'сходить в магазин' },
					],
				},
				{
					id: 2,
					title: 'В процессе',
					cards: [{ id: 4, title: 'посмотреть сериал' }],
				},
				{
					id: 3,
					title: 'Сделано',
					cards: [
						{ id: 5, title: 'сделать домашку' },
						{ id: 6, title: 'погулять с собакой' },
					],
				},
			],
		};
	}

	render() {
		const { title, lists } = this.state;
		const { board_id } = this.props.match.params;
		return (
			<>
				<div className="hader_board">
					<button className="btn_home">Домой</button>
					<p className="title_board">{title}</p>
				</div>
				<div className="board_lists">
					{lists.map((list: IListItem) => (
						<List title={list.title} cards={list.cards} />
					))}
					<div className="add_list">
						<button className="btn_add_list">+ Добавить список</button>
					</div>
				</div>
			</>
		);
	}
}

export default withRouter(Board);
