/* eslint-disable react/destructuring-assignment */
import './board.scss';

export default function Board(props: { color: string; title: string }) {
	return (
		<div className="board" style={{ backgroundColor: props.color }}>
			<p className="title_board_h">{props.title}</p>
		</div>
	);
}
