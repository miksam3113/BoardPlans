/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { useDispatch } from 'react-redux';
import { CreateList, getBoard } from 'store/modules/board/actions';

function CreList(props: { title: string; pos: () => number; id: number }) {
	const dispatch = useDispatch();

	function createList() {
		dispatch(CreateList(props.title, props.pos(), props.id));
		dispatch(getBoard(props.id));
	}

	return (
		<button onClick={createList} className="add_list">
			<p className="add_list_title">Add List +</p>
		</button>
	);
}

export default CreList;
