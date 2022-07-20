/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable no-empty */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prefer-stateless-function */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreateBoard } from '../../../../store/modules/boards/actions';
import './popup.scss';

export default function Popup(props: {
	active: boolean;
	setActive: (active: boolean) => void;
	handleModal?: () => void;
}) {
	function validator(regExp: RegExp, title: string): boolean {
		return regExp.test(title);
	}

	const regExp = /^((\w|[А-ЯЁа-яё])+[\s.-]?)+$|^$/;

	const [title, setTitle] = useState({ title: '' });
	const dispatch = useDispatch();

	function Validate(e: any) {
		const input = e.target.value;
		console.log(input);
		const title_v = validator(regExp, input) ? input : '';
		console.log(title_v);
		setTitle({
			...title,
			title: title_v,
		});
	}

	function Create() {
		if (title) {
			dispatch(CreateBoard(title.title.trim()));
			props.handleModal?.();
			setTitle({
				...title,
				title: '',
			});
		}
	}

	return (
		<div id="popup" className={props.active ? 'popup active' : 'popup'} onClick={() => props.setActive(false)}>
			<div className="popup_body" onClick={(e) => e.stopPropagation()}>
				<p className="p_title">Создание доски</p>
				<input id="input" onChange={Validate} className="p_inp" placeholder="Введи название..."></input>
				<button id="btn_create" onClick={Create} className="p_btn">
					Создать +
				</button>
			</div>
		</div>
	);
}
