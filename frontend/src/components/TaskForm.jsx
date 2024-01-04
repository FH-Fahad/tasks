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

    const response = await fetch("/api/tasks", {
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
      setTitle("");
      setDescription("");
      setCompleted(false);
      setError(null);
      dispatch({ type: "ADD_TASK", payload: data });
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
      <button className="button">Create Task</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default TaskForm;
