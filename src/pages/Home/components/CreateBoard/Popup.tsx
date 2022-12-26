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
import { CreateBoard } from 'store/modules/boards/actions';
import './popup.scss';

export default function Popup(props: {
	boards: any;
	active: boolean;
	handleModal?: () => void;
	updateData?: (value: string) => void;
}) {
	function validator(regExp: RegExp, title: string): boolean {
		return regExp.test(title);
	}

	const regExp = /^((\w|[А-ЯЁа-яё])+[\s.-]?)+$|^$/;
	const [title, setTitle] = useState({ title: '' });
	const [color, setColor] = useState({ color: '' });
	const [error, setError] = useState({ error: '' });
	const dispatch = useDispatch();
	const [colors, setColors] = useState([
		{ id: '#e30606', name: 'red', active: false },
		{ id: '#07b407', name: 'green', active: false },
		{ id: '#3131a5', name: 'blue', active: false },
		{ id: '#f59b01', name: 'yellow', active: false },
		{ id: '#7509cd', name: 'purple', active: false },
	]);

	function Validate(e: any) {
		const input = e.target.value;
		const title_v = validator(regExp, input) ? input : '';
		if (title_v) {
			setError({
				...error,
				error: '',
			});
		}
		if (props.boards.length === 0) {
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
		// eslint-disable-next-line array-callback-return,no-restricted-syntax
		else
			for (const board of props.boards) {
				if (title_v === board.title) {
					setError({
						...error,
						error: 'Oops, this title already exists...',
					});
					break;
				} else {
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
			}
	}

	function ColorCus(e: any) {
		const input = e.target.value;
		setColor({
			...color,
			color: input,
		});
		setError({
			...error,
			error: '',
		});
	}
	function Create() {
		if (!color.color) {
			setError({
				...error,
				error: 'Oops, select color...',
			});
		}
		if (!title.title) {
			setError({
				...error,
				error: 'Oops, write title...',
			});
		}
		if (props.boards.length !== 0) {
			// eslint-disable-next-line array-callback-return,no-restricted-syntax
			for (const board of props.boards) {
				if (title.title === board.title) {
					setError({
						...error,
						error: 'Oops, this title already exists...',
					});
				}
				if (error.error === '' && title.title !== board.title && title.title && color.color) {
					dispatch(CreateBoard(title.title.trim(), color.color));
					props.handleModal?.();
					setTitle({
						...title,
						title: '',
					});
					setColor({
						...color,
						color: '',
					});
					setError({
						...error,
						error: '',
					});
					props.updateData?.(color.color);
					window.location.reload();
				}
			}
		} else if (props.boards.length === 0) {
			if (error.error === '' && title.title && color.color) {
				dispatch(CreateBoard(title.title.trim(), color.color));
				props.handleModal?.();
				setTitle({
					...title,
					title: '',
				});
				setColor({
					...color,
					color: '',
				});
				setError({
					...error,
					error: '',
				});
				props.updateData?.(color.color);
				window.location.reload();
			}
		}
	}
	function Cancel() {
		setTitle({
			...title,
			title: '',
		});
		setColor({
			...color,
			color: '',
		});
		setError({
			...error,
			error: '',
		});
		props.handleModal?.();
	}
	const onSelectItem = (item: any, index: number) => {
		setColors(colors.map((v, idx) => (index === idx ? { ...v, active: !item.active } : v)));
		setError({
			...error,
			error: '',
		});
	};
	return (
		<div id="popup" style={{ cursor: 'pointer' }} className={props.active ? 'popup active' : 'popup'} onClick={Cancel}>
			<div
				style={{ cursor: 'auto' }}
				className={props.active ? 'popup_body active' : 'popup_body'}
				onClick={(e) => e.stopPropagation()}
			>
				<p className="p_title">Create board</p>
				<p className={error.error ? 'p_error active' : 'p_error'}>{error.error}</p>
				<input id="input" onChange={Validate} autoComplete="off" className="p_inp" placeholder="Write title..."></input>
				<div className="color_board">
					{colors.map((colorM, index) => (
						<button
							onClick={() => {
								setColor({
									...color,
									color: colorM.id,
								});
								// eslint-disable-next-line array-callback-return
								colors.map((colorik, index) => {
									colorik.active = false;
									onSelectItem(colorik, index);
								});
								onSelectItem(colorM, index);
							}}
							className={`color_btn ${colorM.name} ${colorM.active ? 'active' : ''}`}
						></button>
					))}
					<button className="custom_color">
						<p className="custom_plus">+</p>
						<input autoComplete="off" onChange={ColorCus} className="custom_inp" type="color" />
					</button>
				</div>
				<button id="btn_create" onClick={Create} className="p_btn">
					Create +
				</button>
			</div>
		</div>
	);
}
