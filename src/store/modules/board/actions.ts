/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-absolute-path */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { Dispatch } from 'redux';
import api from '../../../api/request';

export const getBoard = (id: number) => async (dispatch: Dispatch) => {
	try {
		const board = await api.get(`/board/${id}`);
		await dispatch({ type: 'GET_BOARD', payload: { board, id } });
		console.log(id);
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

export const DeleteBoard = (id: number) => async (dispatch: Dispatch) => {
	try {
		await api.delete(`/board/${id}`);
		await dispatch({ type: 'DELETE_BOARD', payload: { id } });
	} catch (e) {
		console.log(e);
		dispatch({ type: 'ERROR_ACTION_TYPE' });
	}
};

export const CreateList =
	(title: string, pos: number, id: number) =>
	async (dispatch: Dispatch): Promise<void> => {
		try {
			await api.post(`/board/${id}/list`, { title, position: pos });
			await dispatch({ type: 'POST_LIST', payload: { ...{ title, pos }, id } });
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
		await api.delete(`/board/${id_b}/list/${id_l}`);
		await dispatch({ type: 'DELETE_BOARD', payload: { id_b, id_l } });
	} catch (e) {
		console.log(e);
		dispatch({ type: 'ERROR_ACTION_TYPE' });
	}
};
