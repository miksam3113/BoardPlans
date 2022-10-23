/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { EditList } from 'store/modules/board/actions';
import DelList from './DeleteList/DeleteList';
import Card from '../Card/Card';
import './list.scss';
import CreCard from '../Card/CreateCard/CreateCard';

export default function List(props: { id: number; position: number; title: string; list: any }) {
	function validator(regExp: RegExp, title: string): boolean {
		return regExp.test(title);
	}

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
	}

	function funPress(event: { keyCode: number }) {
		if (event.keyCode === 13 && title.title) {
			dispatch(EditList(props.id, props.list.id, title.title.trim(), props.list.position));
		}
	}
	const { cards } = props.list;
	return (
		<div className="list">
			<div className="header_list">
				<input
					maxLength={12}
					onChange={Validate}
					className="title_list"
					type="text"
					placeholder={props.title}
					onKeyDown={funPress}
				/>
				<DelList id_b={props.id} id_l={props.list.id} />
			</div>
			<div className="middle_list">
				{cards && Object.values(cards).map((card: any) => <Card title={card.title} />)}
				<CreCard pos={props.position} id_b={props.id} id_l={props.list.id} />
			</div>
		</div>
	);
}
