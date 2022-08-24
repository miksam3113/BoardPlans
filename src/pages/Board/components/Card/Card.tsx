/* eslint-disable react/destructuring-assignment */
import './card.scss';

export default function Card(props: { title: string }) {
	return (
		<button className="card">
			<p className="title_card">{props.title}</p>
		</button>
	);
}
