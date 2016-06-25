import React from 'react';
// import Auth from '../Auth';
import request from 'superagent';

import * as Auth from '../../secrets.js';

class App extends React.Component {

	constructor(props){
		super(props);

	}

	render() {
		return (
			<div>
				<h1>Super Duper Unofficial Github Browser v0.1</h1>
				
				{this.props.children}
			</div>
		);
	}

}


App.propTypes = {
	children: React.PropTypes.node,

};

export default App;
