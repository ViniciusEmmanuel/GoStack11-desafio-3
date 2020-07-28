import React, { useRef, useEffect, useState } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const addTodoInputRef = useRef(null);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    (async () => {
      const { status, data } = await api.get("/repositories");

      if (status === 200) {
        setRepositories(data);
      }
    })();
  }, []);

  async function handleAddRepository() {
    const title = String(addTodoInputRef.current.value).trim();

    const { status, data } = await api.post("/repositories", { title });

    if (status === 200) {
      setRepositories([...repositories, data]);
    }
  }

  async function handleRemoveRepository(id) {
    const { status } = await api.delete(`/repositories/${id}`);

    if (status === 204) {
      const updateRepository = repositories.filter(
        (repository) => repository.id !== id
      );

      setRepositories(updateRepository);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <input type="text" ref={addTodoInputRef} />
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
