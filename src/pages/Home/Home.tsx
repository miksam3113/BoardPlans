/* eslint-disable react/no-direct-mutation-state,prettier/prettier */
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
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBoards } from 'store/modules/boards/actions';
import errorReducer from 'store/modules/error/reducer';
import IBoard from '../../common/interfaces/IBoard';
import './components/home.scss';
import Popup from './components/CreateBoard/Popup';
import Board from './components/Board/Board';
import Spin from '../Spin/Spin';
// eslint-disable-next-line import/order
import { RootState } from 'store/reducer';

// eslint-disable-next-line @typescript-eslint/naming-convention
type propsType = {
	// eslint-disable-next-line react/no-unused-prop-types
	boards: any;
	getBoards: () => Promise<void>;
};

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/ban-types
type stateType = {
	modalActive: boolean;
	color: string;
};

class Home extends React.Component<propsType, stateType> {
	constructor(props: propsType) {
		super(props);
		this.state = {
			modalActive: false,
			color: '',
		};
	}

	async componentDidMount() {
		await this.props.getBoards();
	}

	setPopup = () => {
		this.setState({ modalActive: !this.state.modalActive });
	};

	setColor = (value: string) => {
		this.setState({ color: value });
	};

	render() {
		console.log(this.props.boards.boards);
		return (
			<section className="body_home">
				<p className="title_home">My boards</p>
				<Spin page="Home" />
				<div className="all_boards">
					{this.props.boards.boards &&
						this.props.boards.boards.map((board: any) => (
							<Link to={`/board/${board.id}/`} style={{ textDecoration: 'none' }}>
								<Board key={board.id} color={board.custom} title={board.title} />
							</Link>
						))}
					<button onClick={this.setPopup} className="add_board">
						+ Create Board
					</button>
				</div>
				<Popup
					boards={this.props.boards.boards}
					active={this.state.modalActive}
					handleModal={this.setPopup}
					updateData={this.setColor}
				/>
			</section>
		);
	}
}

const mapStateToProps = (state: { boards: IBoard[] }) => ({
	...state.boards,
});

export default connect(mapStateToProps, { getBoards })(Home);
