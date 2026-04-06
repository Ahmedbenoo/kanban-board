import axios from "axios";
import type { Task } from "../types/task";

const API_URL = "http://localhost:4000/tasks";

// GET
export const getTasks = async (): Promise<Task[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

// CREATE
export const createTask = async (task: Task): Promise<Task> => {
  const res = await axios.post(API_URL, task);
  return res.data;
};

// UPDATE
export const updateTask = async (
  id: number,
  updated: Partial<Task>
): Promise<Task> => {
  const res = await axios.put(`${API_URL}/${id}`, updated);
  return res.data;
};

// DELETE
export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};