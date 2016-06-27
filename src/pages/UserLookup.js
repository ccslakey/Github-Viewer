import React from 'react';
import { Jumbotron, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import request from 'superagent';
import UserList from './UserList';
import List from './List';

class UserLookup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: '',
			searchQuery: '',
			users: [],
		}
	}

	componentWillMount() {
		this.searchForUsers('facebook');
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


	searchForUsers(willMountInput = undefined) {
		let searchQuery = this.state.input || willMountInput;
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
		  <Jumbotron>
		    <h1>Hello, world!</h1>
		    <p>This is a simple search for github users and orgs</p>

		  <form>
			  <FormGroup controlId="formControlsText">
			  	<FormControl
					type="text"
					value={this.state.input}
		  			onChange={this.handleInput.bind(this)}
					placeholder="Enter a User or Organization name" />
				<Button type="submit" onClick={this.handleSubmit.bind(this)} bsStyle="primary">Search</Button>
			 </FormGroup>
				<br/>


			</form>
		  </Jumbotron>
		  <p>Looking for {this.state.searchQuery || 'facebook'} </p>

		  <UserList users={this.state.users}/>
		</div>
      );
    }

}

export default UserLookup;
