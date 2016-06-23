import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import App from './pages/App';
import Detail from './pages/Detail';
import List from './pages/List';
import routes from './routes.js'

const appHistory = useRouterHistory(createHashHistory)({});


ReactDOM.render(
	<Router history={ appHistory } onUpdate={() => window.scrollTo(0,0)}>
		{ routes }
	</Router>,
	document.getElementById('app')
);
