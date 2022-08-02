/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable react/sort-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBoards } from '../../store/modules/boards/actions';
import IBoard from '../../common/interfaces/IBoard';
import './components/home.scss';
import Popup from './components/CreateBoard/Popup';
import Board from './components/Board/Board';

// eslint-disable-next-line @typescript-eslint/naming-convention
type propsType = {
	// eslint-disable-next-line react/no-unused-prop-types
	boards: any;
	getBoards: () => Promise<void>;
};

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/ban-types
type stateType = {
	modalActive: boolean;
};

class Home extends React.Component<propsType, stateType> {
	constructor(props: propsType) {
		super(props);
		this.state = {
			modalActive: false,
		};
	}

	async componentDidMount() {
		await this.props.getBoards();
	}

	setpopup = () => {
		this.setState({ modalActive: !this.state.modalActive });
	};

	render() {
		console.log(this.props.boards.boards);
		return (
			<>
				<p className="title_home">Мои доски</p>
				<div className="all_boards">
					{this.props.boards.boards &&
						this.props.boards.boards.map((board: any) => (
							<Link to={`/board/${board.id}/`}>
								<Board key={board.id} title={board.title} />
							</Link>
						))}
					<button onClick={this.setpopup} className="add_board">
						+ Create Board
					</button>
				</div>
				<Popup active={this.state.modalActive} handleModal={this.setpopup} />
			</>
		);
	}
}

const mapStateToProps = (state: { boards: IBoard[] }) => ({
	...state.boards,
});

export default connect(mapStateToProps, { getBoards })(Home);
