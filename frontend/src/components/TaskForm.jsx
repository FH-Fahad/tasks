import { useState } from "react";

import { useAuthContext } from "../hooks/useAuthContext";
import { useTaskContext } from "../hooks/useTaskContext";

const TaskForm = () => {
  const { dispatch } = useTaskContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to create a task");
      return;
    }

    const task = { title, description, completed };

    const response = await fetch("http://localhost:4000/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
    }

    if (response.ok) {
      await dispatch({ type: "ADD_TASK", payload: data });

      await fetchTasks();

      setTitle("");
      setDescription("");
      setCompleted(false);
      setError(null);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/tasks", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TASKS", payload: data });
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h2>Create New Task</h2>
      <input
        type="text"
        id="title"
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        id="description"
        rows="3"
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      {/* <div className="checkbox-container">
        <label>Completed</label>
        <input
          type="checkbox"
          id="completed"
          checked={completed}
          className="checkbox"
          placeholder="Completed"
          onChange={(e) => setCompleted(e.target.checked)}
        />
      </div> */}
      <button className="button">Create Task</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default TaskForm;
