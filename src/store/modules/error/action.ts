import { Dispatch } from 'redux';

export function errorType(text: string) {
	return (dispatch: Dispatch) => {
		dispatch({ type: 'ERROR_ACTION_TYPE', text });
	};
}
