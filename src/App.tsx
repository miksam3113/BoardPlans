import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home/Home';

const App = () => (
	<Router>
		<Switch>
			<Route path="/" component={Home} />
		</Switch>
	</Router>
);

export default App;
