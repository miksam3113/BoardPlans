/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './popup.scss';
import { CreateCard, EditList, getBoard } from 'store/modules/board/actions';

export default function Popup(props: {
	cre_position: number;
	cre_id_b: number;
	cre_id_l: number;
	active: boolean;
	// eslint-disable-next-line react/require-default-props
	setActive: (b: boolean) => void;
}) {
	function validator(regExp: RegExp, title: string): boolean {
		return regExp.test(title);
	}

	const regExp = /^((\w|[А-ЯЁа-яё])+[\s.-]?)+$|^$/;
	const [title, setTitle] = useState({ title: '' });
	const [error, setError] = useState({ error: '' });
	const dispatch = useDispatch();

	function Validate(e: any) {
		const input = e.target.value;
		const title_v = validator(regExp, input) ? input : '';
		console.log(title_v);
		setTitle({
			...title,
			title: title_v,
		});
		setError({
			...error,
			error: '',
		});
	}

	function Create(event: { keyCode: number }) {
		if (event.keyCode === 13) {
			if (title.title) {
				console.log(title.title);
				dispatch(CreateCard(title.title.trim(), props.cre_position, props.cre_id_b, props.cre_id_l));
				props.setActive(false);
				setTitle({
					...title,
					title: '',
				});
			} else {
				setError({
					...error,
					error: 'Oops, write title...',
				});
			}
		}
	}
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			props.setActive(false);
		}
	});
	return (
		// eslint-disable-next-line react/destructuring-assignment
		<div
			id="popup"
			className={props.active ? 'popup_card active' : 'popup_card'}
			onClick={() => props.setActive(false)}
		>
			<div className="popup_body_card" onClick={(e) => e.stopPropagation()}>
				<p className="p_card_error">{error.error}</p>
				<input
					id="input"
					onChange={Validate}
					onKeyDown={Create}
					maxLength={12}
					className="p_inp card_inp"
					placeholder="Write title..."
					autoComplete="off"
					value={title.title}
				/>
			</div>
		</div>
	);
}
