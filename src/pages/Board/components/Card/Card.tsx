import '../List/list.scss';

export default function Card(props: { title: string }) {
	return (
		<div className="card">
			<p className="title_card">{props.title}</p>
		</div>
	);
}
