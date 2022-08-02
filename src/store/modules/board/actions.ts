/* eslint-disable import/no-absolute-path */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { Dispatch } from 'redux';
import api from '../../../api/request';

export const getBoard = (id: string) => async (dispatch: Dispatch) => {
	try {
		const board = await api.get(`/board/${id}`);
		await dispatch({ type: 'GET_BOARD', payload: { board, id } });
	} catch (e) {
		console.log(e);
		dispatch({ type: 'ERROR_ACTION_TYPE' });
	}
};

export const EditBoard = (id: string, Ntitle: string) => async (dispatch: Dispatch) => {
	try {
		await api.put(`/board/${id}`, { title: Ntitle });
		await dispatch({ type: 'PUT_BOARD', payload: { id, title: Ntitle } });
	} catch (e) {
		console.log(e);
		dispatch({ type: 'ERROR_ACTION_TYPE' });
	}
};
