import React from 'react';
import request from 'superagent';
import {IndexLink, Link} from 'react-router';
import {Button} from 'react-bootstrap';

class User extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			events: [],
			repos: [],
			gists: [],
			userInfo: [],
			mode: 'repos',
		}
	}

	componentWillMount() {
		switch (this.state.mode){
			case 'events':
				this.fetchFeed('events', this.props.params.user);
				break;
			case 'gists':
				this.fetchFeed('gists', this.props.params.user);
				break;
			case 'repos':
				this.fetchFeed('repos', this.props.params.user);
				break;
			default:
				break;
		}
	}
	saveFeed(type, contents) {
		this.setState({ [type]: contents });
	}
	selectMode(mode){
		console.log(`showing ${mode}`);
		this.setState({mode});
		this.fetchFeed(mode);
	}

	fetchFeed(type, name = "facebook") {
		if (this.props.params.repo === ''){
			// woops, there's no name here, aka save me on API limits
			return;
		}
		console.log(`fetching feed of ${name} with type: ${type}`);
		const baseURL = `https://api.github.com/users/${name}`;
		request.get(`${baseURL}/${type}`)
			.end((error, response) => {
				if (!error && response) {
					console.dir(response.body);
					this.saveFeed(type, response.body);
				} else {
					console.log(`Error fetching ${type}`, error);
				}
			}
		);
	}

	renderUserItems() {
		let content;
		if (this.state.mode === 'event') {
			content = this.renderEvents();
		} else if (this.state.mode === 'gists') {
			content = this.renderGists();
		} else {
			content = this.renderUserRepos();
		}

		return content;
	}

	renderEvents() {
		return this.state.events.map((event, index) => {
			const eventType = event.type;
			const repoName = event.repo.name;
			const creationDate = event.created_at;

			return (<p key={index}>
				<strong>{repoName}</strong>: {eventType} at {new Date(creationDate).toLocaleString()}.
			</p>);
		})
	}

	renderGists() {
		return this.state.gists.map((gist, index) => {
			const url = gist.html_url;
			const creationDate = gist.created_at;
			const gistName = Object.keys(gist.files)[0]
			return (<p key={index}>
				<strong><a href={url}>{gistName}</a></strong>:  at {new Date(creationDate).toLocaleString()}.
			</p>);
		})
	}


	renderUserRepos() {
		return this.state.repos.map((repo, index) => {
			const url = repo.html_url;
			const repoName = repo.name;
			const author = repo.owner.login;

			return (<p key={index}>
				{author} authored <Link to={`/detail/${repoName}`}>{repoName}</Link > |
				<a href={url}> View on Github </a>
			</p>);
		})
	}

	render() {
		return (<div>
			<p>You are here:
			<IndexLink to='/' activeClassName='active'>Home</IndexLink> > {this.props.params.user} </p>
			<Button bsStyle="primary" ref='events' onClick={this.selectMode.bind(this, 'events')}>Show events</Button>
		    <Button bsStyle="primary" ref='gists' onClick={this.selectMode.bind(this, 'gists')}>Show gists</Button>
			<Button bsStyle="primary" ref='repos' onClick={this.selectMode.bind(this, 'repos')}>Show repos</Button>

			{this.renderUserItems()}

			</div>);
	}

}

User.propTypes = {
    params: React.PropTypes.object,
};

export default User;
