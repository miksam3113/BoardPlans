import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducer';
import './spin.css';

function Spin() {
	const spinner = useSelector((state: RootState) => state.loaderReducer.loading);
	return (
		<div className={spinner ? 'wrapper_all' : `${'close'}`}>
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
