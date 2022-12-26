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
import React, { useRef, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import './modal.scss';
import { IoClose } from 'react-icons/all';
import { DeleteCard, EditDescription, EditTitleCard, MoveCard } from 'store/modules/board/actions';
import { useDispatch } from 'react-redux';
import IListItem from 'common/interfaces/IList';
import ICardItem from 'common/interfaces/ICard';

export default function ModalCard(props: {
	cardTitle: string;
	cardDes: string;
	cardId: number;
	listTitle: string;
	listId: number;
	boardId: number;
	active: boolean;
	close: () => void;
	lists: IListItem[];
	cards: ICardItem[];
}) {
	function Cancel() {
		props.close?.();
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		setMoveActive(false);
	}

	function validator(regExp: RegExp, title: string): boolean {
		return regExp.test(title);
	}
	const regExp = /^((\w|[А-ЯЁа-яё])+[\s.-]?)+$|^$/;
	const [title, SetTitle] = useState({ title: '' });
	const [description, SetDescription] = useState({ description: '' });
	const [copied, setCopied] = useState(false);
	const [textarea, setTextarea] = useState(true);
	const dispatch = useDispatch();

	function Validate(e: any) {
		const input = e.target.value;
		const title_v = validator(regExp, input) ? input : '';
		SetTitle({
			...title,
			title: title_v,
		});
	}

	function ValidateDesc(e: any) {
		const desc_v = e.target.value;
		dispatch(EditDescription(props.cardId, props.cardTitle, props.boardId, props.listId, desc_v));
	}

	function funPress(event: { keyCode: number }) {
		if (event.keyCode === 13 && title.title) {
			dispatch(EditTitleCard(props.listId, props.boardId, props.cardId, title.title));
		}
	}

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			Cancel();
		}
	});
	function deleteCard() {
		dispatch(DeleteCard(props.boardId, props.cardId));
		props.close?.();
	}

	const ref = useRef(null);

	function editDescription() {
		setTextarea(!textarea);
		if (textarea) {
			setTimeout(() => {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				ref.current.focus();
			}, 100);
		}
	}

	const [moveActive, setMoveActive] = useState(false);
	return (
		<div className={props.active ? 'modal active' : 'modal'} onClick={Cancel}>
			<div
				className={props.active ? 'modal_body active' : 'modal_body'}
				onClick={(e) => {
					e.stopPropagation();
					e.preventDefault();
				}}
				style={{ cursor: 'auto' }}
			>
				{/* Header */}
				<div className="header_modal">
					<div className="text_header_modal">
						<input
							maxLength={12}
							onChange={Validate}
							className="title_card_modal"
							type="text"
							onKeyDown={funPress}
							placeholder={props.cardTitle}
						/>
						<p className="txt_header_modal">
							In column <b className="txt_p_header_modal">{props.listTitle}</b>
						</p>
					</div>
					<div onClick={Cancel} className="close_header_modal">
						<Link to={`/board/${props.boardId}`}>
							<IoClose size="53px" color="#fff" />
						</Link>
					</div>
				</div>
				{/* Body */}
				<div className="body_modal">
					<div className={copied ? 'copied active' : 'copied'}>
						<p>Copied</p>
					</div>
					<div
						className="middle_body_modal"
						onClick={() => {
							setTextarea(true);
						}}
					>
						<div className="left_page">
							<div className="head_left_page">
								<p>Description </p>
								<button
									onClick={(e) => {
										editDescription();
										e.preventDefault();
										e.stopPropagation();
									}}
								>
									Edit
								</button>
							</div>
							<textarea
								ref={ref}
								disabled={textarea}
								onChange={ValidateDesc}
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
								}}
								placeholder={props.cardDes ? `${props.cardDes}` : 'Not description'}
							>
								{props.cardDes ? `${props.cardDes}` : ''}
							</textarea>
						</div>
						<div className="right_page">
							{' '}
							<p className="actions_txt">Actions</p>
							<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '45px' }}>
								<CopyToClipboard
									text={window.location.href}
									onCopy={() => {
										setCopied(true);
										setTimeout(() => {
											setCopied(false);
										}, 1500);
									}}
								>
									<button className="btn_share_body_modal">Share</button>
								</CopyToClipboard>
								<button onClick={() => setMoveActive(!moveActive)} className="btn_share_body_modal">
									Move
								</button>
								<button onClick={deleteCard} className="btn_delete_body_modal">
									Delete
								</button>
							</div>
						</div>
						<div
							style={{ height: `${props.lists.length * 50 + 10}px` }}
							className={moveActive ? 'drop_move_menu' : 'hide'}
						>
							{props.lists.map((list) => (
								<button
									onClick={() => {
										console.log(list.id, props.listId);
										dispatch(MoveCard(list.id, props.boardId, props.cardId, list.position, props.listId, props.cards));
										props.close?.();
									}}
								>
									{list.title}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
