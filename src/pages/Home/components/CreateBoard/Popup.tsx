/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable jsx-a11y/control-has-associated-label */
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
import { CreateBoard, getBoards } from '../../../../store/modules/boards/actions';
import './popup.scss';

export default function Popup(props: {
	active: boolean;
	handleModal?: () => void;
	updateData?: (value: string) => void;
}) {
	function validator(regExp: RegExp, title: string): boolean {
		return regExp.test(title);
	}

	const regExp = /^((\w|[А-ЯЁа-яё])+[\s.-]?)+$|^$/;
	const [title, setTitle] = useState({ title: '' });
	const [color, setColor] = useState('');
	const [eror, setEror] = useState({ eror: '' });
	const dispatch = useDispatch();
	const colors = [
		{ id: '#e30606', name: 'red' },
		{ id: '#07b407', name: 'green' },
		{ id: '#3131a5', name: 'blue' },
		{ id: '#f59b01', name: 'yellow' },
		{ id: '#7509cd', name: 'purple' },
	];

	function Validate(e: any) {
		const input = e.target.value;
		const title_v = validator(regExp, input) ? input : '';
		setTitle({
			...title,
			title: title_v,
		});
		setEror({
			...eror,
			eror: '',
		});
	}

	function ColorCus(e: any) {
		const input = e.target.value;
		setColor(input);
	}

	function Create() {
		if (title.title && color) {
			dispatch(CreateBoard(title.title.trim(), color));
			props.handleModal?.();
			setTitle({
				...title,
				title: '',
			});
			setColor('');
			props.updateData?.(color);
			dispatch(getBoards());
		} else {
			setEror({
				...eror,
				eror: 'Ups, eror...',
			});
		}
	}
	return (
		<div id="popup" className={props.active ? 'popup active' : 'popup'} onClick={props.handleModal}>
			<div className="popup_body" onClick={(e) => e.stopPropagation()}>
				<p className="p_title">Create board</p>
				<p className="p_eror">{eror.eror}</p>
				<input id="input" onChange={Validate} className="p_inp" placeholder="Write title..."></input>
				<div className="color_board">
					{colors.map((colorM) => (
						<button onClick={() => setColor(colorM.id)} className={`color_btn ${colorM.name}`}></button>
					))}
					<button className="custom_color">
						<p className="custom_plus">+</p>
						<input onChange={ColorCus} className="custom_inp" type="color" />
					</button>
				</div>
				<button id="btn_create" onClick={Create} className="p_btn">
					Create +
				</button>
			</div>
		</div>
	);
}
