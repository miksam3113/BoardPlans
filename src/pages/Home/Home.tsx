/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable react/sort-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBoards } from '../../store/modules/boards/actions';
import IBoard from '../../common/interfaces/IBoard';
import './components/home.scss';
import Popup from './components/CreateBoard/Popup';

// eslint-disable-next-line @typescript-eslint/naming-convention
type propsType = {
	// eslint-disable-next-line react/no-unused-prop-types
	boards: IBoard[];
	getBoards: () => Promise<void>;
};

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/ban-types
type stateType = {};

class Home extends React.Component<propsType, stateType> {
	constructor(props: propsType) {
		super(props);
	}

	async componentDidMount() {
		await this.props.getBoards();
	}

	render() {
		const [modalActive, setModalActive] = useState(true);
		console.log(modalActive, setModalActive);

		return (
			<>
				<p className="title_home">Мои доски</p>
				<div className="all_boards">
					<button onClick={() => setModalActive(true)} className="add_board">
						+ Create Board
					</button>
				</div>
				<Popup active={modalActive} setActive={setModalActive} />
			</>
		);
	}
}

const mapStateToProps = (state: { boards: IBoard[] }) => ({
	...state.boards,
});

export default connect(mapStateToProps, { getBoards })(Home);
