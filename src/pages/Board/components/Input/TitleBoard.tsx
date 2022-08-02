/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { EditBoard } from '../../../../store/modules/board/actions';
import './titleboard.scss';

function Input(props: { value: string; id: string }) {
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
		console.log(title_v);
	}

	function funPress(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter' && title) {
			console.log(props.id);
			dispatch(EditBoard(props.id, title.title.trim()));
		}
	}

	return (
		<input onChange={Validate} className="title_set" type="text" placeholder={props.value} onKeyPress={funPress} />
	);
}

export default Input;
