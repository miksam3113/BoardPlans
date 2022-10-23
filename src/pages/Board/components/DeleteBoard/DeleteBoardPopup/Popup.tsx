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
import { DeleteBoard } from 'store/modules/board/actions';
import './popup.scss';
import { doc } from 'prettier';

export default function Popup(props: { title: string; active: boolean; id: number; handleModal?: () => void }) {
	function validator(regExp: RegExp, title: string): boolean {
		return regExp.test(title);
	}

	const regExp = /^((\w|[А-ЯЁа-яё])+[\s.-]?)+$|^$/;
	const [title, setTitle] = useState({ title: '' });
	const [eror, setEror] = useState({ eror: '' });
	const dispatch = useDispatch();

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

	function Delete() {
		if (title.title === props.title) {
			dispatch(DeleteBoard(props.id));
			props.handleModal?.();
			setTitle({
				...title,
				title: '',
			});
		} else {
			setEror({
				...eror,
				eror: 'Ups, eror...',
			});
		}
	}
	return (
		<div id="popup" className={props.active ? 'popup_del_b active' : 'popup_del_b'} onClick={props.handleModal}>
			<div className="popup_del_b_body" onClick={(e) => e.stopPropagation()}>
				<p className="p_del_b_title">Are you sure you want to delete the board?</p>
				<p className="p_del_b_des">
					Write <b>{props.title}</b> to delete the board.
				</p>
				<p className="p_del_eror">{eror.eror}</p>
				<input id="input" onChange={Validate} className="p_del_b_inp" placeholder="Write..."></input>
				<div className="btn_cont">
					<button id="btn_create" onClick={props.handleModal} className="p_del_b_btn">
						Cancel
					</button>
					<button id="btn_create" onClick={Delete} className="p_del_b_btn del">
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}
