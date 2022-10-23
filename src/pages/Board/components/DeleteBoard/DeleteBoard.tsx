/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-redeclare */
import React, { useState } from 'react';
import Popup from 'pages/Board/components/DeleteBoard/DeleteBoardPopup/Popup';

// eslint-disable-next-line react/no-unused-prop-types
function DelBoard(props: { title: string; id: number }) {
	const [active, setActive] = useState(false);
	function Active() {
		setActive(!active);
	}

	return (
		<>
			<a onClick={Active} className="btn_del_board">
				DeleteBoard
			</a>
			{/* eslint-disable-next-line react/jsx-no-bind */}
			<Popup title={props.title} id={props.id} active={active} handleModal={Active} />
		</>
	);
}

export default DelBoard;
