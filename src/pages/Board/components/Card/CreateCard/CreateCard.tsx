/* eslint-disable */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable-next-line react/jsx-no-bind */
import React, { useState } from 'react';
import './crecard.scss';
import Popup from 'pages/Board/components/Card/CreateCard/Popup/Popup';

function CreCard(props: { pos: number; id_b: number; id_l: number }) {
	const [active, setActive] = useState(false);

	return (
		<>
			<button onClick={() => setActive(true)} className="btn_add_card">
				<p className="add_card_title">Add Card +</p>
			</button>
			<Popup
				cre_position={props.pos}
				cre_id_b={props.id_b}
				cre_id_l={props.id_l}
				active={active}
				setActive={setActive}
			/>
		</>
	);
}

export default CreCard;
