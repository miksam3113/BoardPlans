/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import { BrowserRouter as Router, Switch, Route, useParams, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducer';
import Home from './pages/Home/Home';
import Board from './pages/Board/Board';
import 'App.scss';

function App() {
	const error = useSelector((state: RootState) => state.errorReducer.error);
	return (
		<Router>
			<Switch>
				{error && (
					<>
						{' '}
						<div className="showError">
							<div className="errorContent">
								<h2 className="errorH2">Oops!</h2>
								<p className="errorP">{error}</p>
							</div>
						</div>{' '}
					</>
				)}
				<Route exact path="/">
					<Home boards={[]} />
				</Route>
				{error && (
					<>
						{' '}
						<div className="showError">
							<div className="errorContent">
								<p className="errorP">{error}</p>
							</div>
						</div>{' '}
					</>
				)}
				<Route exact path="/board/:boardId/" component={Board} />
			</Switch>
		</Router>
	);
}

export default App;

useRouteMatch;
