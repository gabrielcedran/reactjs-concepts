import React, {useState, useEffect} from "react";
import api from './services/api';
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories')
    .then(response => {
      setRepositories([...response.data]);
    })
  }, []);

  async function handleAddRepository() {
    const {data} = await api.post('/repositories', {
      title:`Design Patterns in Java ${Date.now()}`,
      url: "https://gabrielcedran.me",
      techs: ["Java", "Spring"]
    });

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    if (repositoryIndex >= 0) {
      await api.delete(`/repositories/${id}`);
      const repositoriesCopy = [...repositories];
      repositoriesCopy.splice(repositoryIndex, 1);
      setRepositories(repositoriesCopy);
    }

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {console.log(repositories)}
        {repositories.map(repository => 
        (
        <li key={repository.id}>{repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
        </li>
        )
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
