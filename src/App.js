import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import SearchBar from './components/SearchBar';
import UserInfo from './components/UserInfo';

library.add(fab);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      isLoading: false
    }

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleUserChange('cauequeiroz');
  }

  handleUserChange(user) {
    this.setState({ isLoading: true })

    fetch(`https://api.github.com/users/${user}?client_id=8504348`)
      .then(data => data.json())
      .then(data => {
        const user = this.filterUserData(data);
        this.setState({ user, isLoading: false });
      })
  }

  filterUserData(data) {
    const fields = [
      'type', 'company', 'blog', 'location', 'email',
      'public_repos', 'public_gists', 'followers', 'following'
    ];

    const user = {
      image: data.avatar_url,
      name: data.name,
      username: data.login,
      bio: data.bio,
      info: []
    };

    Object.keys(data).forEach(item => {
      if (fields.indexOf(item) !== -1) {
        if (data[item]) {
          user.info.push({ key: item, value: data[item] });
        }
      }
    });

    return user;
  }

  render() {
    return (
      <div className="App">
        <SearchBar
          onChange={this.handleUserChange} />
        <UserInfo
          loading={this.state.isLoading}
          user={this.state.user} />
      </div>
    );
  }
}

export default App;
