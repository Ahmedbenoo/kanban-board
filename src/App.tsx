import { useState, useEffect } from "react";
import Column from "./components/board/Column";
import { useTaskStore } from "./store/useTaskStore";
import type { Task } from "./types/task";
import AddTask from "./components/AddTask";
import { DndContext } from "@dnd-kit/core";
import Toast from "./components/Toast";
import "./index.css"

function App() {
  const {
    tasks,
    loading,
    error,
    fetchTasks,
    search,
    setSearch,
    editTask,
  } = useTaskStore();

  const [toast, setToast] = useState({
    show: false,
    message: "",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  // Toast function
  const showToast = (msg: string) => {
    setToast({ show: true, message: msg });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Filter tasks
  const filteredTasks = tasks.filter((t: Task) => {
    const term = (search || "").toLowerCase();

    return (
      (t.title || "").toLowerCase().includes(term) ||
      (t.description || "").toLowerCase().includes(term)
    );
  });

  // Drag Handler 
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = Number(active.id);
    const newColumn = over.id as Task["column"];

    editTask(taskId, { column: newColumn });
  };

  //Columns
  const backlog = filteredTasks.filter((t) => t.column === "backlog");
  const inProgress = filteredTasks.filter(
    (t) => t.column === "in_progress"
  );
  const review = filteredTasks.filter((t) => t.column === "review");
  const done = filteredTasks.filter((t) => t.column === "done");

  return (
    <div style={{ width: "95%", margin: "auto", padding: "20px" }}>
      {/* Toast */}
      <Toast
        show={toast.show}
        message={toast.message}
        onClose={() => setToast({ ...toast, show: false })}
      />

      <div className="d-flex justify-content-between align-items-center">
        {/* ✅ Search */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            marginBottom: "20px",
            padding: "10px",
            width: "300px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <AddTask />
      </div>

      {/* Drag Context */}
      <DndContext onDragEnd={handleDragEnd}>
        <div className="colm-container" style={{ display: "flex", gap: "20px"}}>
          <Column
            title="Backlog"
            tasks={backlog}
            column="backlog"
            showToast={showToast}
          />

          <Column
            title="In Progress"
            tasks={inProgress}
            column="in_progress"
            showToast={showToast}
          />

          <Column
            title="Review"
            tasks={review}
            column="review"
            showToast={showToast}
          />

          <Column
            title="Done"
            tasks={done}
            column="done"
            showToast={showToast}
          />
        </div>
      </DndContext>
    </div>
  );
}

export default App;