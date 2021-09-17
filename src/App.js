import GitHubImage from './images/github.jpg';
import './App.css';
import { useState } from 'react';

//aula: https://www.youtube.com/watch?v=IOJoJGDowEY

function App() {
  //reat-rookie
  const [search, setSearch] = useState('');
  const [userData, setUserData] = useState();

  const handleSubmit = (event) => {
    //evita o refresh da página após o submit
    event.preventDefault();
    //o fetch é nativo das novas versões do js, é como se fosse o clientHttp
    fetch(`https://api.github.com/users/${search}`)
      .then(response => response.json())
      .then(userResponse => setUserData(userResponse));
  }

  //cria a função onChange para gerenciar o estado do search
  const handleChange = (event) => {
    setSearch(event.target.value);
  }

  return (
    <div className="container text-center">
      <h1 className="py-5 text-uppercase">Github Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-group">
            <input type="text"
              className="form-control"
              required
              value={search}
              onChange={handleChange}
            />
            <span className="input-group-btn">
              <button type="submit" className="btn btn-dark">
                Search
              </button>
            </span>
          </div>
        </div>
      </form>
      <div className="py-5">
        {
          !userData && (
            <img src={GitHubImage} alt="GitHub" className="responsive rounded-circle" height="200px" />
          )
        }
      </div>
      {
        userData && (
          <div>
            <img src={userData.avatar_url} alt="GitHub" className="responsive rounded-circle" height="200px" />
            <h1 className="pt-5">
              <a className="link-info" href={userData.html_url} target="_new">
                {userData.name}
              </a>
            </h1>
            <h3>{userData.location}</h3>
            <p>
              <a href={userData.blog} target="_new" className="text-info">{userData.blog}</a>
            </p>
            <p>
              Followers: {userData.followers} | Following: {userData.following}
            </p>
          </div>
        )
      }
    </div>
  );
}

export default App;
