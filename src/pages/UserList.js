import React from 'react';
import request from 'superagent';
import { Link } from 'react-router';

class UserList extends React.Component {
	constructor(props){
		super(props);
	}


	renderLinks(){
		return this.props.users.map((user, index) => {
			const org = user.login ? user.login : 'Anonymous';


			return (<li key={index} className='user'>
				<Link to={ `/user/${org}` }>{org}</Link>
			</li>);
		});
	}

	render() {
		let content = this.renderLinks();
		return (
			<div>
				<ul>
					{content}
				</ul>
			</div>
		);
	}
}

export default UserList;
