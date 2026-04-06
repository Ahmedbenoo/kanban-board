import { create } from "zustand";
import { getTasks, createTask, updateTask, deleteTask } from "../api/tasks";
import type { Task } from "../types/task";

type TaskStore = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  search: string;

  setSearch: (value: string) => void;
  fetchTasks: () => Promise<void>;

  addTask: (task: { title: string; description: string }) => Promise<void>;
  editTask: (id: number, updated: Partial<Task>) => Promise<void>;
  removeTask: (id: number) => Promise<void>;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  loading: false,
  error: null,
  search: "",

  setSearch: (value: string) => set({ search: value }),

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getTasks();
      set({ tasks: data, loading: false });
    } catch {
      set({ error: "Failed to fetch tasks", loading: false });
    }
  },

  addTask: async (task) => {
    try {
      if (!task.title || !task.description) {
        set({ error: "Title and description are required" });
        return;
      }

      const newTask = await createTask({
        id: Date.now(),
        title: task.title,
        description: task.description,
        column: "backlog",
      });

      set((state) => ({
        tasks: [...state.tasks, newTask],
      }));
    } catch {
      set({ error: "Failed to add task" });
    }
  },

  editTask: async (id, updated) => {
    try {
      const existingTask = useTaskStore.getState().tasks.find(
        (t) => t.id === id
      );

      if (!existingTask) return;

      const fullTask = { ...existingTask, ...updated };

      const updatedTask = await updateTask(id, fullTask);

      set((state) => ({
        tasks: state.tasks.map((t) =>
          t.id === id ? updatedTask : t
        ),
      }));
    } catch {
      set({ error: "Failed to update task" });
    }
  },

  removeTask: async (id) => {
    try {
      await deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
      }));
    } catch {
      set({ error: "Failed to delete task" });
    }
  },
}));