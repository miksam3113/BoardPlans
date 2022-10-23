/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { Dispatch } from 'redux';
import { loaderOn, loaderOff } from 'store/modules/loader/action';
import { errorType } from 'store/modules/error/action';
import api from '../../../api/request';

export const getBoards = () => async (dispatch: Dispatch) => {
	try {
		dispatch(loaderOn());
		const boards = await api.get('/board');
		setTimeout(async () => {
			dispatch({ type: 'UPDATE_BOARDS', payload: boards });
			dispatch(loaderOff());
		}, 600);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		dispatch(errorType('Ошибка API'));
	} catch (e) {
		console.log(e);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		dispatch(errorType('Ошибка API'));
		dispatch(loaderOff());
	}
};

export const CreateBoard =
	(text: string, clr: string) =>
	async (dispatch: Dispatch): Promise<void> => {
		try {
			await api.post('/board', { title: text, custom: clr });
			dispatch({ type: 'POST_BOARD', payload: { ...{ title: text, custom: clr } } });
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			await dispatch(getBoards());
		} catch (e) {
			dispatch({ type: 'ERROR_ACTION_TYPE' });
		}
	};
