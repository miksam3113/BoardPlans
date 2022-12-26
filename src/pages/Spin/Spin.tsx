import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducer';
import './spin.css';

function Spin(props: { page: string }) {
	const spinner = useSelector((state: RootState) => state.loaderReducer.loading);
	let bg;
	// eslint-disable-next-line react/destructuring-assignment
	if (props.page === 'Board') {
		bg = 'body_board';
		// eslint-disable-next-line react/destructuring-assignment
	} else if (props.page === 'Home') {
		bg = '';
	}
	return (
		<div className={spinner ? `wrapper_all ${bg}` : `${'close'}`}>
			<div className={spinner ? 'wrapper' : `${'close'}`}>
				<div className="circle"></div>
				<div className="circle"></div>
				<div className="circle"></div>
				<div className="shadow"></div>
				<div className="shadow"></div>
				<div className="shadow"></div>
				<span>Loading</span>
			</div>
		</div>
	);
}

export default Spin;
