import React from 'react'
import { IndexLink, Link } from 'react-router';
import request from 'superagent';

class List extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			repos: ['react', 'react-native', 'jest'],
			org: "facebook",
		}
	}

	componentWillMount() {
		this.getRepos();
	}

	getRepos(user = this.state.org || "facebook") {
		const baseURL = `https://api.github.com/users/${user}/repos?page=1&per_page=100`;
		request.get(`${baseURL}`)
			.end((error, response) => {
				if (!error && response) {
					// console.dir(response);
					this.setState({repos:response.body})
				} else {
					console.log(`Error fetching ${type}`, error);
				}
			}
		);
	}


	renderLinks(){
		return this.state.repos.map((repo, index) => {
	        const repoName = repo.name ? repo.name : 'Anonymous';

	        return (<li key={index} className='user-repo'>
				<Link to={ `/detail/${repoName}` }>{repoName}</Link>
	        </li>);
	    });
	}


    render() {
		let content;
		if (this.state.repos) {
			content = this.renderLinks()
		}

		return (
            <div>
				<p>You are viewing: <IndexLink to="/" activeClassName="active">Facebook</IndexLink></p>
				<p><Link to="/lookup">Look up another user or organization</Link></p>
                <p>Please choose a repository from the list below.</p>
                <ul>
                    <li><Link to="/detail/react" className='user-repo'>React</Link></li>
                    <li><Link to="/detail/react-native">React Native</Link></li>
					<li><Link to="/detail/jest">Jest</Link></li>
					{content}
                </ul>
            </div>
        );
	}
}



export default List;
