/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import { BrowserRouter as Router, Switch, Route, useParams, useRouteMatch } from 'react-router-dom';
import Home from './pages/Home/Home';
import Board from './pages/Board/Board';

const App = () => (
	<Router>
		<Switch>
			<Route exact path="/">
				<Home boards={[]} />
			</Route>
			<Route exact path="/board/:boardId/" component={Board} />
		</Switch>
	</Router>
);

export default App;

useRouteMatch;
