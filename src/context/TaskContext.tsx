import { createContext, ReactNode, useContext, useState } from "react";
import { Task } from "../types/type";
import { createTaskRequest, getTasksRequest } from "../api/tasks.ts";

interface TaskContextType {
  tasks: Task[];
  getTasks: () => Promise<void>;
  createTask: (task: Task) => Promise<void>;
}

export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  getTasks: async () => {},
  createTask: async () => {},
});

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task: Task) => {
    try {
      const res = await createTaskRequest(task);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TaskContext.Provider value={{ tasks, getTasks, createTask }}>
      {children}
    </TaskContext.Provider>
  );
};
