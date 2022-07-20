/* eslint-disable react/destructuring-assignment */
import './board.scss';

export default function Board(props: { title: string }) {
	return (
		<button className="board">
			<p className="title_board_h">{props.title}</p>
		</button>
	);
}
