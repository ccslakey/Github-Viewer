import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './pages/App';
import Detail from './pages/Detail';
import List from './pages/List';
import User from './pages/User';
import UserLookup from './pages/UserLookup';


const routes = (
	<Route path="/" component={ App } >
		<IndexRoute component={ UserLookup } />
		<Route path="user/:user" component={ User } />
		<Route path="user/:user/detail/:repo" component={ Detail } />
		<Route path="/list" component={ List } />
	</Route>
);

export default routes;
