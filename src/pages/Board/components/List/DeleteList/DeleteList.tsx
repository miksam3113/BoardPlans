/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { useDispatch } from 'react-redux';
import { DeleteList } from 'store/modules/board/actions';

function DelList(props: { id_b: number; id_l: number }) {
	const dispatch = useDispatch();

	function deleteList() {
		dispatch(DeleteList(props.id_b, props.id_l));
	}

	return (
		<button onClick={deleteList} className="delete_list">
			X
		</button>
	);
}

export default DelList;
