import React from 'react';
import { Provider } from 'react-redux';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('roots'));

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
