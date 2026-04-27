import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadTodos() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/todos`);
      if (!response.ok) {
        throw new Error("Failed to load todos.");
      }

      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTodos();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!text.trim()) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      console.log("making post call to add todo");
      const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to create todo.");
      }

      const todo = await response.json();
      setTodos((currentTodos) => [todo, ...currentTodos]);
      setText("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleTodo(todo) {
    try {
      setError("");

      const response = await fetch(`${API_URL}/todos/${todo._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ done: !todo.done }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo.");
      }

      const updatedTodo = await response.json();
      setTodos((currentTodos) =>
        currentTodos.map((item) => (item._id === updatedTodo._id ? updatedTodo : item))
      );
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteTodo(id) {
    try {
      setError("");

      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo.");
      }

      setTodos((currentTodos) => currentTodos.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="page-shell">
      <section className="panel">
        <p className="eyebrow">React + Express + MongoDB</p>
        <h1>Tiny To-Do App</h1>
        <p className="intro">
          Small enough to understand quickly, clean enough to use for Docker, CI/CD, and deployment
          practice.
        </p>

        <form className="composer" onSubmit={handleSubmit}>
          <input
            id="add-task"
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Add a task"
          />
          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Add"}
          </button>
        </form>

        {error ? <p className="status error">{error}</p> : null}
        {loading ? <p className="status">Loading todos...</p> : null}

        {!loading && !todos.length ? (
          <div className="empty-state">
            <span>Nothing here yet.</span>
            <p>Create your first task to test the API flow.</p>
          </div>
        ) : null}

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo._id} className={todo.done ? "todo-card done" : "todo-card"}>
              <button className="toggle" onClick={() => toggleTodo(todo)} type="button">
                {todo.done ? "Done" : "Open"}
              </button>
              <span>{todo.text}</span>
              <button className="delete" onClick={() => deleteTodo(todo._id)} type="button">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
