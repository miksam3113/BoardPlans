/* eslint-disable react/destructuring-assignment */
import './board.scss';

export default function Board(props: { title: string }) {
	return <a className="title_board_h board">{props.title}</a>;
}
