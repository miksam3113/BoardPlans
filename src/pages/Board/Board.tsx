/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable react/no-unused-state */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, useLocation, useParams } from 'react-router-dom';
import { getBoard } from '../../store/modules/board/actions';
import './components/Board/board.scss';
import { List } from './components/List/List';
import IListItem from '../../common/interfaces/IList';
import IPageBoard from '../../common/interfaces/IPageBoard';
import Input from './components/Input/TitleBoard';

type propsType = {
	board: IPageBoard;
};
type stateType = any;
type funType = {
	getBoard: (id: string) => Promise<void>;
};
type TParams = RouteComponentProps<{ boardId: any; id: string | undefined }>;

class Board extends React.Component<TParams & funType & propsType, stateType> {
	id = this.props.match.params.boardId;

	constructor(props: any) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {
		const id = this.id;
		if (id) {
			await this.props.getBoard(id);
		}
	}

	render() {
		console.log(this.id);
		const { title, lists } = this.props.board;
		console.log(this.props.board);
		return (
			<>
				<div className="hader_board">
					<a href="/" className="btn_home">
						Домой
					</a>
					<Input value={title} id={this.id} />
				</div>
				<div className="board_lists">
					{lists && Object.values(lists).map((list: IListItem) => <List title={list.title} cards={list.cards} />)}
					<div className="add_list">
						<button className="btn_add_list">+ Добавить список</button>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state: { board: IPageBoard }) => ({
	...state.board,
});

export default connect(mapStateToProps, { getBoard })(Board);
