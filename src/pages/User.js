import React from 'react';
import request from 'superagent';
import { IndexLink, Link } from 'react-router';

class User extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			feed: []
		}
	}


	componentWillMount(){
		request.get(`https://api.github.com/users/${this.props.params.user}/events`)
			.end((error, response) => {
				if (!error && response) {
					this.setState({ feed: response.body });
					console.dir(response.body);
				} else {
					console.log(`Error fetching user data.`, error);
				}
			}
		);
	}

	render() {
		return <ul>
	        {this.state.feed.map((event, index) => {
	            const eventType = event.type;
	            const repoName = event.repo.name;
	            const creationDate = event.created_at;

	            return (<li key={index}>
	                <strong>{repoName}</strong>: {eventType} at {new Date(creationDate).toLocaleString()}.
	            </li>);
	        })}
	    </ul>;
	}

}

export default User;
