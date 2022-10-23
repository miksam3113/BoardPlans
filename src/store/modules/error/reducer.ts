const initialState = {
	error: null,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export default function errorReducer(state = initialState, action: { type: string; payload: never }) {
	switch (action.type) {
		case 'ERROR_ACTION_TYPE':
			return {
				...state,
				error: action.payload,
			};
		default: {
			return state;
		}
	}
}
