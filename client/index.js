import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';

render(
	<Router>
		<div>
			<Route path="/" component={App} />
			<Route exact path="/" component={Greetings} />
			<Route path="/signup" component={SignupPage} />
		</div>
	</Router>, document.getElementById('app'));
