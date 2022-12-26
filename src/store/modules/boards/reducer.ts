/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/no-explicit-any */
import IBoard from '../../../common/interfaces/IBoard';

const initialState = {
	boards: [] as IBoard[],
};

export default function reducer(state = initialState, action: { type: string; payload?: any }) {
	switch (action.type) {
		case 'GET_BOARDS':
			return {
				...state,
				boards: action.payload,
			};
		case 'POST_BOARDS':
			return {
				...state,
			};
		default: {
			return { ...state, ...action.payload };
		}
	}
}
