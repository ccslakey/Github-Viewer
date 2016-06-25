import React from 'react';
import request from 'superagent';
import UserList from './UserList';

class UserLookup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: '',
			searchQuery: '',
			users: [],
		}
	}

    handleInput(event) {
		event.preventDefault();
		this.setState({input: event.target.value});
    }

	handleSubmit(event){
		event.preventDefault();
		var query = this.state.input;
		this.setState({searchQuery: query, input: ''});
		this.searchForUsers();
	}

	searchForUsers() {
		let searchQuery = this.state.input;
		const baseURL = `https://api.github.com/search/users?q=${searchQuery}`;
		request.get(`${baseURL}`)
			.end((error, response) => {
				if (!error && response) {
					// console.dir(response);
					this.setState({users:response.body.items})
				} else {
					console.log(`Error fetching ${searchQuery}`, error);
				}
			}
		);
	}

    render() {
      return (
		  <div>
		  <form>
        		<input
          		type="text"
          		value={this.state.input}
		  		onChange={this.handleInput.bind(this)}
        		/>
				<button onClick={this.handleSubmit.bind(this)}>Search</button>
				<UserList users={this.state.users}/>
			</form>

		</div>
      );
    }

}

export default UserLookup;
