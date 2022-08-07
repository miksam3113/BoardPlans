/* eslint-disable react/destructuring-assignment */
import './board.scss';

export default function Board(props: { title: string }) {
	return (
		<div className="board">
			<p className="title_board_h">{props.title}</p>
		</div>
	);
}
