/* eslint-disable */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DelList from './DeleteList/DeleteList';
import '../Card/card.scss';
import './list.scss';
import CreCard from '../Card/CreateCard/CreateCard';
import IListItem from 'common/interfaces/IList';
import ICardItem from 'common/interfaces/ICard';
import Card from '../Card/Card';
import { comparePositionCard } from 'common/functions';
import { EditList } from 'store/modules/board/actions';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ModalCard from 'pages/Board/components/CardModal/Modal';

export default function List(props: {
	currPostId: string | undefined;
	boardId: number;
	id: number;
	title: string;
	list: IListItem;
	position: number;
	lists: IListItem[];
}) {
	function validator(regExp: RegExp, title: string): boolean {
		return regExp.test(title);
	}
	// @ts-ignore
	const { boardId } = useParams();
	const regExp = /^((\w|[А-ЯЁа-яё])+[\s.-]?)+$|^$/;
	const [title, SetTitle] = useState({ title: '' });
	const dispatch = useDispatch();

	function Validate(e: any) {
		const input = e.target.value;
		const title_v = validator(regExp, input) ? input : '';
		SetTitle({
			...title,
			title: title_v,
		});
		dispatch(EditList(boardId, props.id, title_v, props.position));
	}
	function funPress(event: { keyCode: number }) {
		if (event.keyCode === 13 && title.title) {
			dispatch(EditList(boardId, props.id, title.title.trim(), props.position));
		}
	}
	return (
		<div className="list" id={`list_${props.id}`}>
			<div className="header_list">
				<input
					maxLength={12}
					onChange={Validate}
					className="title_list"
					type="text"
					onKeyDown={funPress}
					placeholder={props.title}
					autoComplete="off"
				/>
				<DelList id_b={boardId} id_l={props.id} />
			</div>
			<div className="middle_list">
				{props.list.cards &&
					Object.values(props.list.cards)
						.sort(comparePositionCard)
						.map((card: ICardItem) => (
							<Card
								key={card.index}
								description={card.description}
								currPostId={props.currPostId}
								listId={props.id}
								listTitle={props.title}
								boardId={props.boardId}
								title={card.title}
								id={card.id}
								lists={props.lists}
								cards={props.list.cards}
							/>
						))}
			</div>
			<CreCard pos={props.position} id_b={boardId} id_l={props.id} />
		</div>
	);
}
