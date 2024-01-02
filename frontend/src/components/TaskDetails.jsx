/* eslint-disable react/prop-types */
import { useAuthContext } from "../hooks/useAuthContext";
import { useTaskContext } from "../hooks/useTaskContext";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

// eslint-disable-next-line react/prop-types
const TaskDetails = ({ task }) => {
  const { dispatch } = useTaskContext();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    if (!user) return;

    const response = await fetch(
      `http://localhost:4000/api/tasks/${task._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TASK", payload: data });
    }
  };

  const handleComplete = async () => {
    if (!user) return;

    const response = await fetch(
      `http://localhost:4000/api/tasks/${task._id}`,
      {
        method: "PEATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ completed: true }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      dispatch({ type: "COMPLETE_TASK", payload: data });
    }
  };

  return (
    <div className="task-details">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>{formatDistanceToNow(new Date(task.createdAt))} ago</p>
      {task.completed ? (
        <p>Completed</p>
      ) : (
        <button onClick={handleComplete}>Complete</button>
      )}
      {user && (
        <div>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
