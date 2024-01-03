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
  // const [emptyFields, setEmptyFields] = useState([]);

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
      // setEmptyFields(data.emptyFields);
    }

    if (response.ok) {
      setTitle("");
      setDescription("");
      setCompleted(false);
      setError(null);
      // setEmptyFields([]);

      dispatch({ type: "ADD_TASK", payload: data });
    }
  };

  return (
    <div className="task-form">
      <h2>Create a new task</h2>
      <form onSubmit={handleSubmit}>
        {/* <label>Title</label> */}
        <input
          type="text"
          id="title"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          // className={emptyFields.includes("title") ? "error" : ""}
        />
        {/* <label>Description</label> */}
        <textarea
          id="description"
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          // className={emptyFields.includes("description") ? "empty" : ""}
        />
        {/* <label>Completed</label> */}
        <input
          type="checkbox"
          id="completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <button type="submit">Create</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TaskForm;
