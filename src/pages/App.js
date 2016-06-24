import React, { PropTypes as T } from 'react';

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
