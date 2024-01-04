import { useEffect } from "react";
import { useTaskContext } from "../hooks/useTaskContext";
import { useAuthContext } from "../hooks/useAuthContext";

import TaskDetails from "../components/TaskDetails";
import TaskForm from "../components/TaskForm";

const Home = () => {
  const { user } = useAuthContext();
  const { tasks, dispatch } = useTaskContext();

  useEffect(
    () => async () => {
      const getTasks = async () => {
        if (!user) return;

        const response = await fetch("/api/tasks", {
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
        await getTasks();
      }
    },
    [user, dispatch]
  );

  return (
    // <div className="home pages">
    //   <TaskForm />
    //   <div className="tasks">
    //     {tasks.map((task) => (
    //       <TaskDetails key={task._id} task={task} />
    //     ))}
    //   </div>
    // </div>

    <div className="home pages">
      <TaskForm />
      <div className="tasks">
        {tasks.length === 0 && <p className="empty">No tasks yet!</p>}
        {tasks.map((task) => (
          <TaskDetails key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Home;
