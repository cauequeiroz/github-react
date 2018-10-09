import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import SearchBar from './components/SearchBar';
import UserInfo from './components/UserInfo';
import ReposPanel from './components/ReposPanel';
import GithubAPI from './services/GithubAPI';

library.add(fab);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      repos: null,
      isInfoLoading: false,
      isReposLoading: false
    }

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleReposOpen = this.handleReposOpen.bind(this);
  }

  componentDidMount() {
    this.handleUserChange('cauequeiroz');
  }

  handleUserChange(user) {
    this.setState({ isInfoLoading: true });

    GithubAPI.getUserInfo(user)
      .then(user => this.setState({ user, isInfoLoading: false, repos: null }));
  }

  handleReposOpen(event, open) {
    if (!open) return;

    this.setState({ isReposLoading: true });

    GithubAPI.getUserRepos(this.state.user.username)
      .then(repos => this.setState({ repos, isReposLoading: false }));
  }

  render() {
    return (
      <div className="App">
        <SearchBar
          onChange={this.handleUserChange} />
        <UserInfo
          loading={this.state.isInfoLoading}
          user={this.state.user} />

        <ReposPanel
          loading={this.state.isReposLoading}
          repos={this.state.repos}
          onChange={this.handleReposOpen} />
      </div>
    );
  }
}

export default App;
