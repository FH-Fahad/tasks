import { useState, useReducer, createContext } from "react";

export const TaskContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return {
        tasks: action.payload,
      };
    case "ADD_TASK":
      return {
        tasks: [...state.tasks, action.payload],
      };
    case "UPDATE_TASK":
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case "DELETE_TASK":
      return {
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "COMPLETE_TASK":
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
export const TaskContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, { tasks: [] });
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <TaskContext.Provider
      value={{ ...state, dispatch, selectedTask, setSelectedTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
