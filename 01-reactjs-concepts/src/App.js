import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [indexRepository, setIndexRepository] = useState(0);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      if (response) {
        setRepositories(response.data);
      }
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `${indexRepository}-gostack-teste-challenge`,
      url: "https://github.com/jbresolinn",
      techs: ["reactjs", "javascript", "css"],
    });

    setRepositories([...repositories, response.data]);

    setIndexRepository(indexRepository + 1);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div className="content">
      <ul data-testid="repository-list">
        {repositories.length !== 0 ? (
          repositories.map((repository) => (
            <li key={repository.id}>
              <div className="repositoryContent">
                <h1>{repository.title}</h1>
                <span className="url">{repository.url}</span>
                <ul className="techs">
                  {repository.techs.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        ) : (
          <span>Não há repositórios cadastrados :(</span>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
