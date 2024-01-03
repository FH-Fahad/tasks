import { useEffect } from "react";
import { useTaskContext } from "../hooks/useTaskContext";
import { useAuthContext } from "../hooks/useAuthContext";

import TaskDetails from "../components/TaskDetails";
import TaskForm from "../components/TaskForm";

const Home = () => {
  const { user } = useAuthContext();
  const { tasks, dispatch } = useTaskContext();

  useEffect(() => {
    const getTasks = async () => {
      if (!user) return;

      const response = await fetch("http://localhost:4000/api/tasks", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TASKS", payload: data });
      }
    };

    if (user) {
      getTasks();
    }
  }, [user, dispatch]);

  return (
    <div className="home">
      <TaskForm />
      <div className="tasks">
        {tasks.map((task) => (
          <TaskDetails key={task._id} task={task} />
        ))}
        <br />
      </div>
    </div>
  );
};

export default Home;
