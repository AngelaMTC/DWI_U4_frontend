import { useEffect, useState } from "react";
import "./App.css";
import {
  completeTodo,
  deleteTodo,
  getTodos,
  hardDeleteTodo,
  createTodo,
  updateTodo,
} from "./api/todos";

import { TiEdit } from "react-icons/ti";

function App() {
  const [todos, setTodos] = useState([]);

  const [newTodo, setNewTodo] = useState({});

  async function fetchTodos() {
    const fetchedTodos = await getTodos();
    console.log({ fetchedTodos });
    setTodos(fetchedTodos);
  }

  const TodoComponent = ({
    _id,
    title,
    description,
    updatedAt,
    completed,
    removeTodo,
    hardDeleteTodo,
    toggleTodo,
    handleCreateOrUpdateTodo,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [edditingTodo, setEditingTodo] = useState({});

    const handleEdit = () => {
      setIsEditing((current) => !current);
      setEditingTodo({ _id, title, description, completed });
    };

    return (
      <div className="todo-item">
        <h2>
          {title} <TiEdit onClick={handleEdit} />
        </h2>
        <h4>{description}</h4>
        <p style={{ color: completed ? "green" : "red" }}>
          <input
            checked={completed}
            type="checkbox"
            onChange={() => toggleTodo(_id)}
          />
          <b>{completed ? " Completed" : "Not completed"}</b>{" "}
        </p>
        <p>
          Last update:<b>{updatedAt}</b>{" "}
        </p>
        <button className="button-danger" onClick={() => removeTodo(_id)}>
          Delete
        </button>
        <button className="button-danger" onClick={() => hardDeleteTodo(_id)}>
          Hard Delete
        </button>

        {isEditing && (
          <div>
            Titile
            <input
              type="text"
              name="title"
              value={edditingTodo.title}
              onChange={(e) =>
                setEditingTodo((current) => ({
                  ...current,
                  title: e.target.value,
                }))
              }
            />
            Description
            <input
              type="text"
              name="description"
              value={edditingTodo.description}
              onChange={(e) =>
                setEditingTodo((current) => ({
                  ...current,
                  description: e.target.value,
                }))
              }
            />
            <button
              className="button-primary"
              onClick={() => handleCreateOrUpdateTodo(edditingTodo)}
            >
              Update Todo
            </button>
          </div>
        )}
        <hr />
      </div>
    );
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const removeTodo = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  const toggleComepleted = async (id) => {
    await completeTodo(id);
    fetchTodos();
  };

  const ereaseTodo = async (id) => {
    await hardDeleteTodo(id);
    fetchTodos();
  };

  const handleCreateOrUpdateTodo = async (todo) => {
    if (!todo._id) {
      await createTodo(todo);
      setNewTodo({ title: "", description: "" });
      fetchTodos();
      return;
    }
    const { _id } = todo;
    delete todo._id;
    await updateTodo(_id, todo);
    fetchTodos();
  };

  return (
    <div>
      <div className="todo-list">
        <h1>TODOS</h1>
        {todos &&
          todos.map((todo) => (
            <TodoComponent
              {...todo}
              handleCreateOrUpdateTodo={handleCreateOrUpdateTodo}
              hardDeleteTodo={ereaseTodo}
              removeTodo={removeTodo}
              toggleTodo={toggleComepleted}
            />
          ))}
        <div>
          Title
          <input
            type="text"
            name="title"
            value={newTodo.title}
            onChange={(e) =>
              setNewTodo((current) => ({ ...current, title: e.target.value }))
            }
          />
          Description
          <input
            type="text"
            name="description"
            value={newTodo.description}
            onChange={(e) =>
              setNewTodo((current) => ({
                ...current,
                description: e.target.value,
              }))
            }
          />
          <button
            className="button-primary"
            onClick={() => handleCreateOrUpdateTodo(newTodo)}
          >
            Create TODO
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
