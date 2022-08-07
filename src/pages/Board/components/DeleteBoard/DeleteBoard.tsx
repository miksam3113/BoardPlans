/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-redeclare */
import React from 'react';
import { useDispatch } from 'react-redux';
import { DeleteBoard } from '../../../../store/modules/board/actions';

function DelBoard(props: { id: number }) {
	const dispatch = useDispatch();

	function deleteBoard() {
		dispatch(DeleteBoard(props.id));
	}

	return (
		<a href="/" onClick={deleteBoard} className="btn_del_board">
			DeleteBoard
		</a>
	);
}

export default DelBoard;
