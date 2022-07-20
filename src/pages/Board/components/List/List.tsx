/* eslint-disable react/jsx-key */
/* eslint-disable react/destructuring-assignment */
import Card from '../Card/Card';
import ICard from '../../../../common/interfaces/ICard';

export const List = (props: { title: string; cards: ICard[] }) => (
	<div className="list">
		<p className="title_list">{props.title}</p>
		{props.cards.map((card: ICard) => (
			<Card title={card.title} />
		))}
		<button className="btn_add_card">+ Add Card</button>
	</div>
);
