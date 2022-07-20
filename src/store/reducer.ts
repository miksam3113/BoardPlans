import { combineReducers } from 'redux';
import boardReducer from './modules/board/reducer';
import boardsReducer from './modules/boards/reducer';

export default combineReducers({
	board: boardReducer,
	boards: boardsReducer,
});
