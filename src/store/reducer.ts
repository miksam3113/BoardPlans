import { combineReducers } from 'redux';
import boardReducer from './modules/board/reducer';
import boardsReducer from './modules/boards/reducer';
import loaderReducer from './modules/loader/reducer';
import errorReducer from './modules/error/reducer';

export const rootReducer = combineReducers({
	board: boardReducer,
	boards: boardsReducer,
	loaderReducer,
	errorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
