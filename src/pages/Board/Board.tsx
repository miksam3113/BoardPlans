import React from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getBoard } from 'store/modules/board/actions';
import './board.scss';
import Spin from 'pages/Spin/Spin';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useParams } from 'react-router';
import { IPageBoard } from 'common/interfaces/IPageBoard';
import IListItem from 'common/interfaces/IList';
import List from './components/List/List';
import CreList from './components/List/CreateList/CreateList';
import Input from './components/Input/TitleBoard';
import DeleteBoard from './components/DeleteBoard/DeleteBoard';

interface BoardState {
	board: { board: IPageBoard };
}

interface BoardProps {
	board: {
		title: string;
		lists: IListItem[];
	};
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function Board(props: AllBoardProps): JSX.Element {
	const { board } = props;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const { boardId } = useParams();
	const dispatch = useDispatch();
	const positionList = () => Object.keys(board.lists).length;
	if (board.title) {
		const { title, lists } = board;
		return (
			<div className="body_board">
				<div className="header_board">
					<a href="/" className="btn_home">
						Home
					</a>
					<Input value={title} id={boardId} />
					<DeleteBoard title={title} id={boardId} />
				</div>
				<div className="board_lists">
					{lists &&
						Object.values(lists).map((list: IListItem) => (
							<List
								key={list.index}
								currPostId={boardId}
								boardId={boardId}
								id={list.id}
								title={list.title}
								list={list}
								position={list.position}
								lists={lists}
							/>
						))}
					<CreList title="List" pos={positionList} id={boardId} />
				</div>
			</div>
		);
	}
	getBoard(dispatch, boardId || '');
	return <Spin page="Board" />;
}

const mapStateToProps = (state: BoardState): BoardProps => ({
	board: state.board.board,
});

const connector = connect(mapStateToProps, { getBoard });
type AllBoardProps = ConnectedProps<typeof connector>;
export default withRouter(connector(Board));
