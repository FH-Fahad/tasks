/* eslint-disable react/prop-types */
import { useAuthContext } from "../hooks/useAuthContext";
import { useTaskContext } from "../hooks/useTaskContext";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

// eslint-disable-next-line react/prop-types
const TaskDetails = ({ task }) => {
  const { dispatch } = useTaskContext();
  const { user } = useAuthContext();

  const handleDelete = async (id) => {
    if (!user) return;

    try {
      const response = await fetch(`http://localhost:4000/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "DELETE_TASK", payload: data });
      } else {
        // Handle the error, e.g., show a notification to the user
        console.error("Failed to delete task on the server:", data.error);
      }
    } catch (error) {
      // Handle unexpected errors, e.g., show a notification to the user
      console.error("An unexpected error occurred:", error);
    }
  };

  const handleComplete = async (id) => {
    if (!user) return;

    // Optimistic UI Update
    const updatedTask = {
      ...task,
      completed: !task.completed,
    };

    dispatch({ type: "COMPLETE_TASK", payload: updatedTask });

    try {
      const response = await fetch(`http://localhost:4000/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ completed: !task.completed }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Revert the update if there's an issue with the server
        dispatch({ type: "COMPLETE_TASK", payload: task });
        // Handle the error, e.g., show a notification to the user
        console.error("Failed to update task on the server:", data.error);
      }
    } catch (error) {
      // Revert the update if there's an exception during the fetch
      dispatch({ type: "COMPLETE_TASK", payload: task });
      // Handle the error, e.g., show a notification to the user
      console.error("An unexpected error occurred:", error);
    }
  };

  // FIXME: fix this complete button
  // FIXME: fix this delete button
  return (
    <div className="task-details">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>
        {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
      </p>
      <div className="align">
        <button
          className="completebutton"
          onClick={() => handleComplete(task._id)}
        >
          {task.completed ? "Complete" : " Not Complete"}
        </button>

        {user && (
          <button
            className="deletebutton"
            onClick={() => handleDelete(task._id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
    //TODO: add a button to complete the task
  );
};

export default TaskDetails;
