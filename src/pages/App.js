import React from 'react';
import { PageHeader, Grid }from 'react-bootstrap';
import request from 'superagent';

import * as Auth from '../../secrets.js';

class App extends React.Component {

	constructor(props){
		super(props);

	}

	render() {
		return (
			<div>
				<Grid>
				<PageHeader>Super Duper Unofficial Github Browser v0.1</PageHeader>

				{this.props.children}
				</Grid>
			</div>
		);
	}

}


App.propTypes = {
	children: React.PropTypes.node,

};

export default App;
