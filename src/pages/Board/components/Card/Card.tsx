/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
import './card.scss';
import React, { useEffect, useState } from 'react';
import ModalCard from 'pages/Board/components/CardModal/Modal';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Redirect } from 'react-router';
import IListItem from 'common/interfaces/IList';
import ICardItem from 'common/interfaces/ICard';

export default function Card(props: {
	// eslint-disable-next-line react/no-unused-prop-types
	currPostId: string | undefined;
	description: string;
	listId: number;
	listTitle: string;
	boardId: number;
	title: string;
	id: number;
	lists: IListItem[];
	cards: ICardItem[];
}) {
	const [flag, setFlag] = useState(false);

	function openModal() {
		setFlag(true);
		localStorage.setItem('modal', String(props.id));
	}

	useEffect(() => {
		if (props.id === Number(localStorage.getItem('modal'))) {
			openModal();
		}
	}, []);
	return (
		<>
			<ModalCard
				key={props.id}
				boardId={props.boardId}
				cardTitle={props.title}
				cardDes={props.description}
				cardId={props.id}
				listTitle={props.listTitle}
				listId={props.listId}
				active={flag}
				close={() => {
					setFlag(false);
					localStorage.setItem('modal', '');
				}}
				lists={props.lists}
				cards={props.cards}
			/>
			<div className="card" onClick={openModal} id={props.id.toString()}>
				<p className="title_card">{props.title}</p>
			</div>
			{flag ? (
				<Redirect to={`/board/${props.boardId}/card/${props.id}`} />
			) : (
				<Redirect to={`/board/${props.boardId}/`} />
			)}
		</>
	);
}
