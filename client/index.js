import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';

const store = createStore(
	rootReducer,
	compose( 
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

render(
	<Provider store={store}>
		<Router>
			<div>
				<Route path="/" component={App} />
				<Route exact path="/" component={Greetings} />
				<Route path="/signup" component={SignupPage} />
				<Route path="/login" component={LoginPage} />
			</div>
		</Router>
	</Provider>, document.getElementById('app'));
