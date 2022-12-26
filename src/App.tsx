import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Board from './pages/Board/Board';
import 'App.scss';
// eslint-disable-next-line import/order
import React from 'react';

function App(): React.ReactElement {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Home boards={[]} />
				</Route>
				<Route path="/board/:boardId" component={Board} />
				<Route exact path="/board/:boardId/card/:cardId" component={Board} />
			</Switch>
		</Router>
	);
}

export default App;
