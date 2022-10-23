/* eslint-disable */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// @ts-ignore
import { rootReducer } from './reducer.ts';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
