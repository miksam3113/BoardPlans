/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
/* eslint-disable react/destructuring-assignment */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { EditList } from 'store/modules/board/actions';
import DelList from './DeleteList/DeleteList';
import './list.scss';

export default function List(props: { id: number; title: string; list: any }) {
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
		if (event.key === 'Enter' && title.title) {
			console.log(props.list);
			dispatch(EditList(props.id, props.list.id, title.title.trim(), props.list.position));
		}
	}

	return (
		<div className="list">
			<div className="header_list">
				<input
					maxLength={12}
					onChange={Validate}
					className="title_list"
					type="text"
					placeholder={props.title}
					onKeyPress={funPress}
				/>
				<DelList id_b={props.id} id_l={props.list.id} />
			</div>
		</div>
	);
}
