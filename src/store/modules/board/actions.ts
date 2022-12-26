/* eslint-disable import/no-absolute-path */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { Dispatch } from 'redux';
import { loaderOn, loaderOff } from 'store/modules/loader/action';
import { createBrowserHistory } from 'history';
import { errorType } from 'store/modules/error/action';
import ICardItem from 'common/interfaces/ICard';
import api from '../../../api/request';

// Board

export async function getBoard(dispatch: Dispatch, id: number): Promise<void> {
	try {
		dispatch(loaderOn());
		const board = await api.get(`/board/${id}`);
		setTimeout(async () => {
			dispatch({ type: 'GET_BOARDS', payload: { board } });
			dispatch(loaderOff());
		}, 600);
	} catch (e) {
		console.log(e);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		dispatch(errorType('Ошибка API'));
		dispatch(loaderOff());
	}
}

export const EditBoard = (id: string, Ntitle: string) => async (dispatch: Dispatch) => {
	try {
		await api.put(`/board/${id}`, { title: Ntitle });
		dispatch({ type: 'PUT_BOARD', payload: { id, title: Ntitle } });
	} catch (e) {
		console.log(e);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		dispatch(errorType('Ошибка API'));
		dispatch(loaderOff());
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
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		dispatch(errorType('Ошибка API'));
		dispatch(loaderOff());
	}
};

// List

export const CreateList =
	(title: string, pos: number, id: number) =>
	async (dispatch: Dispatch): Promise<void> => {
		try {
			await api.post(`/board/${id}/list`, { title, position: pos });
			dispatch({ type: 'POST_LIST', payload: { ...{ title, pos }, id } });
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			await dispatch(getBoard(dispatch, id));
		} catch (e) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			dispatch(errorType('Ошибка API'));
			dispatch(loaderOff());
		}
	};

export const EditList = (id_b: number, id_l: number, Ntitle: string, pos: number) => async (dispatch: Dispatch) => {
	try {
		await api.put(`/board/${id_b}/list/${id_l}`, { title: Ntitle, position: pos });
		dispatch({ type: 'PUT_LIST' });
	} catch (e) {
		console.log(e);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		dispatch(errorType('Ошибка API'));
		dispatch(loaderOff());
	}
};

export const DeleteList = (id_b: number, id_l: number) => async (dispatch: Dispatch) => {
	try {
		dispatch(loaderOn());
		await api.delete(`/board/${id_b}/list/${id_l}`);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		await dispatch(getBoard(dispatch, id_b));
		setTimeout(async () => {
			dispatch({ type: 'DELETE_LIST', payload: { id_b, id_l } });
			dispatch(loaderOff());
		}, 600);
	} catch (e) {
		console.log(e);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		dispatch(errorType('Ошибка API'));
		dispatch(loaderOff());
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
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			await dispatch(getBoard(dispatch, id_b));
		} catch (e) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			dispatch(errorType('Ошибка API'));
			dispatch(loaderOff());
		}
	};

export const EditTitleCard =
	(listId: number, boardId: number, cardId: number, text: string) => async (dispatch: Dispatch) => {
		try {
			await api.put(`/board/${boardId}/card/${cardId}`, { title: text, list_id: listId });
			dispatch({ type: 'PUT_TITLE_CARD' });
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			await dispatch(getBoard(dispatch, boardId));
		} catch (e) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			dispatch(errorType('Ошибка API'));
			dispatch(loaderOff());
		}
	};

export const DeleteCard = (id_b: number, id_c: number) => async (dispatch: Dispatch) => {
	try {
		dispatch(loaderOn());
		await api.delete(`/board/${id_b}/card/${id_c}`);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		await dispatch(getBoard(dispatch, id_b));
		setTimeout(async () => {
			dispatch({ type: 'DELETE_CARD', payload: { id_b, id_c } });
			dispatch(loaderOff());
		}, 600);
	} catch (e) {
		console.log(e);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		dispatch(errorType('Ошибка API'));
		dispatch(loaderOff());
	}
};

export const EditDescription =
	(idCard: number, cardTitle: string, boardId: number, listId: number, description: string) =>
	async (dispatch: Dispatch) => {
		try {
			if (description === '') {
				const desc = ' ';
				await api.put(`/board/${boardId}/card/${idCard}`, { title: cardTitle, description: desc, list_id: listId });
			} else {
				await api.put(`/board/${boardId}/card/${idCard}`, { title: cardTitle, description, list_id: listId });
			}
			setTimeout(async () => {
				dispatch({ type: 'EDIT_DESCRIPTION', payload: { description, listId } });
				dispatch(loaderOff());
			}, 600);
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			await dispatch(getBoard(dispatch, boardId));
		} catch (e) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			dispatch(errorType('Ошибка API'));
			dispatch(loaderOff());
		}
	};

export const MoveCard =
	(listId: number, boardId: number, cardId: number, currPos: number, curListId: number, cards: ICardItem[]) =>
	async (dispatch: Dispatch) => {
		try {
			const objectList = [];
			for (let i = 0; i < cards.length; i++) {
				if (cards[i].id === cardId) {
					objectList.push({ id: cards[i].id, position: 0, list_id: listId });
				}
			}
			await api.put(`/board/${boardId}/card`, objectList);

			dispatch({ type: 'MOVE_CARD' });
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			await dispatch(getBoard(dispatch, boardId));
		} catch (e) {
			console.log(e);
		}
	};
