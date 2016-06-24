import React from 'react';
import request from 'superagent';
import { IndexLink, Link } from 'react-router';


class Detail extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			mode: 'commits',
			commits: [],
			forks: [],
			pulls: [],
		};
	}

	componentWillMount() {
		this.fetchFeed('commits');
		this.fetchFeed('forks');
		this.fetchFeed('pulls');
	}

	fetchFeed(type, name = "facebook") {
		if (this.props.params.repo === ''){
			// woops, there's no name here, aka save me on API limits
			return;
		}
		const baseURL = `https://api.github.com/repos/${name}`;
		request.get(`${baseURL}/${this.props.params.repo}/${type}`)
	        .end((error, response) => {
	            if (!error && response) {
					// console.dir(response.body);
	                this.saveFeed(type, response.body);
	            } else {
	                // console.log(`Error fetching ${type}`, error);
	            }
	        }
	    );
	}

	saveFeed(type, contents) {
		this.setState({ [type]: contents });
	}

	selectMode(mode){
		this.setState({mode});
	}

	renderCommits() {
	    return this.state.commits.map((commit, index) => {
	        const author = commit.author ? commit.author.login : 'Anonymous';

	        return (<p key={index} className='github'>
				<Link to={`/user/${author}`}>{author}</Link >:

				<a href={commit.html_url}>{commit.commit.message.substring(0, 300)}</a>
	        </p>);
	    });
	}

	renderForks() {
	    return this.state.forks.map((fork, index) => {
	        const owner = fork.owner ? fork.owner.login : 'Anonymous';

	        return (<p key={index} className='github'>
				<Link to={ `/user/${owner}` }>{owner}</Link>: forked to <a href={fork.html_url}>{fork.html_url}</a> at {fork.created_at}.
	        </p>);
	    });
	}

	renderPulls() {
	    return this.state.pulls.map((pull, index) => {
	        const user = pull.user ? pull.user.login : 'Anonymous';

	        return (<p key={index} className='github'>
				<Link to={ `/user/${user}` }>{user}</Link>:
	            <a href={pull.html_url}>{pull.body.substring(0, 200)}</a>.
	        </p>);
	    });
	}

    render() {
        let content;
        if (this.state.mode === 'commits') {
            content = this.renderCommits();
        } else if (this.state.mode === 'forks') {
            content = this.renderForks();
        } else {
            content = this.renderPulls();
        }

		return (<div>
			<p>You are here: <IndexLink to="/" activeClassName="active">Home </IndexLink> > {this.props.params.repo}</p>
		    <button ref='commits' onClick={this.selectMode.bind(this, 'commits')}>Show Commits</button>
		    <button ref='forks' onClick={this.selectMode.bind(this, 'forks')}>Show Forks</button>
		    <button ref='pulls' onClick={this.selectMode.bind(this, 'pulls')}>Show Pulls</button>
		    {content}
		</div>);
    }
}

Detail.propTypes = {
    params: React.PropTypes.object,
};

export default Detail;
