/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { Dispatch } from 'redux';
import api from '../../../api/request';

export const getBoards = () => async (dispatch: Dispatch) => {
	try {
		const boards = await api.get('/board');
		await dispatch({ type: 'UPDATE_BOARDS', payload: boards });
	} catch (e) {
		console.log(e);
		dispatch({ type: 'ERROR_ACTION_TYPE' });
	}
};

export const CreateBoard =
	(text: string) =>
	async (dispatch: Dispatch): Promise<void> => {
		try {
			await api.post('/board', { title: text });
			await dispatch({ type: 'POST_BOARD', payload: { ...{ title: text } } });
			await getBoards();
		} catch (e) {
			dispatch({ type: 'ERROR_ACTION_TYPE' });
		}
	};
