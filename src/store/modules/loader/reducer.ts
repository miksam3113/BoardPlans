const initialState = {
	loading: false,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export default function loaderReducer(state = initialState, action: { type: string; payload?: { loading: boolean } }) {
	switch (action.type) {
		case 'LOADER_DISPLAY_ON':
			return {
				...state,
				loading: true,
			};
		case 'LOADER_DISPLAY_OFF':
			return {
				...state,
				loading: false,
			};
		default: {
			return state;
		}
	}
}
