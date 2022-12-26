/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/no-explicit-any */
import IBoard from '../../../common/interfaces/IBoard';

const initialState = {
	board: {} as IBoard,
};

export default function reducer(state = initialState, action: { type: string; payload?: any }) {
	switch (action.type) {
		case 'GET_BOARD':
			return {
				...state,
				board: action.payload,
			};
		case 'PUT_BOARD':
			return {
				...state,
				boardTitle: action.payload,
			};
		case 'DELETE_BOARD':
			return {
				...state,
			};
		case 'POST_LIST':
			return {
				...state,
			};
		case 'PUT_LIST':
			return {
				...state,
			};
		case 'DELETE_LIST':
			return {
				...state,
			};
		case 'POST_CARD':
			return {
				...state,
			};
		case 'PUT_TITLE_CARD':
			return {
				...state,
			};
		case 'DELETE_CARD':
			return {
				...state,
			};
		case 'EDIT_DESCRIPTION':
			return {
				...state,
			};
		case 'MOVE_CARD':
			return {
				...state,
			};
		default: {
			return { ...state, ...action.payload };
		}
	}
}
