jest.autoMockOff();

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Detail = require('../src/pages/Detail').default;

describe('Detail', () => {
	it('starts with zero commits', () => {
		const rendered = TestUtils.renderIntoDocument(
			<Detail params={{repo: ''}} />
		);
	    expect(rendered.state.commits.length).toEqual(0);
	});

	it('shows commits by default', () => {
		const rendered = TestUtils.renderIntoDocument(
			<Detail params={{repo: ''}} />
		);
		expect(rendered.state.mode).toEqual('commits');
	});

	it('shows forks when clicked', () => {
		const rendered = TestUtils.renderIntoDocument(
			<Detail params={{repo: ''}} />
		);
		const btns = TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'button');
		const forksButton = rendered.refs.forks;
		TestUtils.Simulate.click(forksButton);
		expect(rendered.state.mode).toEqual('forks');
	});

	it('shows pulls when clicked', () => {
		const rendered = TestUtils.renderIntoDocument(
			<Detail params={{repo: ''}} />
		);
		const btns = TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'button');
		const pullsButton = rendered.refs.pulls;
		TestUtils.Simulate.click(pullsButton);
		expect(rendered.state.mode).toEqual('pulls');
	});

	it('shows commits when clicked', () => {
		const rendered = TestUtils.renderIntoDocument(
			<Detail params={{repo: ''}} />
		);
		const btns = TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'button');
		const pullsButton = rendered.refs.pulls;
		const commitsButton = rendered.refs.commits
		TestUtils.Simulate.click(pullsButton);
		TestUtils.Simulate.click(commitsButton);
		expect(rendered.state.mode).toEqual('commits');
	});

	it('fetches forks from Github', () => {
		const rendered = TestUtils.renderIntoDocument(
			<Detail params={{repo: ''}} />
		);

		beforeEach(() => {
			if (rendered.state.forks.length > 0) {done();}
		}, 'waiting for commits to be set', 2000);

		afterEach(() => {
			expect(rendered.state.forks.length).toEqual(30);
		});
	});

});
