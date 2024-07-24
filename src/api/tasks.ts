import { Task } from "../types/type.ts";
import axios from "./axios.ts";

export const getTasksRequest = async () => axios.get(`/api/tasks`);

export const getTaskRequest = async (id: string) =>
  axios.get(`/api/tasks/${id}`);

export const createTaskRequest = async (task: Task) =>
  axios.post(`/api/tasks`, task);

export const updateTaskRequest = async (id: string, task: Task) =>
  axios.put(`/api/tasks/${id}`, task);

export const deleteTaskRequest = async (id: string) =>
  axios.delete(`/api/tasks/${id}`);
