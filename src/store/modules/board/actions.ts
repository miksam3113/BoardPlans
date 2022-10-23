/* eslint-disable */
/* eslint-disable import/no-absolute-path */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { Dispatch } from 'redux';
import { loaderOn, loaderOff } from 'store/modules/loader/action';
import { createBrowserHistory } from 'history';
import api from '../../../api/request';

// Board

export const getBoard = (id: number) => async (dispatch: Dispatch) => {
	try {
		dispatch(loaderOn());
		const board = await api.get(`/board/${id}`).then((res) => {
			console.log(res);
			return res;
		});
		setTimeout(async () => {
			dispatch({ type: 'GET_BOARD', payload: { board, id } });
			dispatch(loaderOff());
		}, 600);
	} catch (e) {
		console.log(e);
		dispatch({ type: 'ERROR_ACTION_TYPE' });
	}
};

export const EditBoard = (id: string, Ntitle: string) => async (dispatch: Dispatch) => {
	try {
		await api.put(`/board/${id}`, { title: Ntitle });
		dispatch({ type: 'PUT_BOARD', payload: { id, title: Ntitle } });
	} catch (e) {
		console.log(e);
		dispatch({ type: 'ERROR_ACTION_TYPE' });
	}
};

export const DeleteBoard = (id: number) => async (dispatch: Dispatch) => {
	try {
		await api.delete(`/board/${id}`);
		dispatch({ type: 'DELETE_BOARD', payload: { id } });
		createBrowserHistory().push('/');
		window.location.reload();
	} catch (e) {
		console.log(e);
		dispatch({ type: 'ERROR_ACTION_TYPE' });
	}
};

// List

export const CreateList =
	(title: string, pos: number, id: number) =>
	async (dispatch: Dispatch): Promise<void> => {
		try {
			await api.post(`/board/${id}/list`, { title, position: pos });
			dispatch({ type: 'POST_LIST', payload: { ...{ title, pos }, id } });
			// @ts-ignore
			await dispatch(getBoard(id));
		} catch (e) {
			dispatch({ type: 'ERROR_ACTION_TYPE' });
		}
	};

export const EditList = (id_b: number, id_l: number, Ntitle: string, pos: number) => async (dispatch: Dispatch) => {
	try {
		await api.put(`/board/${id_b}/list/${id_l}`, { title: Ntitle, position: pos });
		await dispatch({ type: 'PUT_LIST', payload: { ...{ Ntitle, pos } } });
	} catch (e) {
		console.log(e);
		dispatch({ type: 'ERROR_ACTION_TYPE' });
	}
};

export const DeleteList = (id_b: number, id_l: number) => async (dispatch: Dispatch) => {
	try {
		dispatch(loaderOn());
		await api.delete(`/board/${id_b}/list/${id_l}`);
		// @ts-ignore
		await dispatch(getBoard(id_b));
		setTimeout(async () => {
			dispatch({ type: 'DELETE_BOARD', payload: { id_b, id_l } });
			dispatch(loaderOff());
		}, 600);
	} catch (e) {
		console.log(e);
		dispatch({ type: 'ERROR_ACTION_TYPE' });
	}
};

// Card

export const CreateCard =
	(title: string, pos: number, id_b: number, id_l: number) =>
	async (dispatch: Dispatch): Promise<void> => {
		try {
			await api.post(`/board/${id_b}/card/`, {
				title,
				list_id: id_l,
				position: pos,
			});
			dispatch({
				type: 'POST_CARD',
				payload: { ...{ title, pos, id_l }, id_b },
			});
			// @ts-ignore
			await dispatch(getBoard(id_b));
		} catch (e) {
			dispatch({ type: 'ERROR_ACTION_TYPE' });
		}
	};
