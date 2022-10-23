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
import { RouteComponentProps } from 'react-router-dom';
import { getBoard } from 'store/modules/board/actions';
import './board.scss';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { toast } from 'react-toastify';
import Spin from 'pages/Spin/Spin';
import List from './components/List/List';
import CreList from './components/List/CreateList/CreateList';
import IListItem from '../../common/interfaces/IList';
import IPageBoard from '../../common/interfaces/IPageBoard';
import Input from './components/Input/TitleBoard';
import DeleteBoard from './components/DeleteBoard/DeleteBoard';

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
		this.state = {
			loading: 0,
		};
	}

	async componentDidMount() {
		const id = this.id;
		if (id) {
			await this.props.getBoard(id);
		}
	}

	positionList = () => Object.keys(this.props.board.lists).length;

	render() {
		const { title, lists } = this.props.board;
		return (
			<div className="body_board">
				<div className="hader_board">
					<a href="/" className="btn_home">
						Home
					</a>
					<Input value={title} id={this.id} />
					<DeleteBoard title={title} id={this.id} />
				</div>
				<Spin />
				<div className="board_lists">
					{lists &&
						Object.values(lists).map((list: IListItem) => (
							<List id={this.id} position={list.position} title={list.title} list={list} />
						))}
					<CreList title="List" pos={this.positionList} id={this.id} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: { board: IPageBoard }) => ({
	...state.board,
});

export default connect(mapStateToProps, { getBoard })(Board);
