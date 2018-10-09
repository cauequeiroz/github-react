const URL = 'https://api.github.com/users/';
const AUTH = '?client_id=8504348';

const getUserInfo = user => fetch(`${URL + user + AUTH}`)
  .then(data => data.json())
  .then(data => {
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
  });


const getUserRepos = user => fetch(`${URL + user}/repos${AUTH}`)
  .then(data => data.json())
  .then(data => data.sort((a, b) => b.stargazers_count - a.stargazers_count))
  .then(data => data.map(item => ({
    fullname: item.full_name,
    description: item.description,
    url: item.url,
    stars: item.stargazers_count
  })))
  .then(data => data.slice(0, 5));

export default {
  getUserInfo,
  getUserRepos
};