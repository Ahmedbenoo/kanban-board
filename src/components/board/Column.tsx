import type { Task } from "../../types/task";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "../TaskCard";
import { useState, useRef, useEffect } from "react";
import "../../index.css"

interface Props {
  title: string;
  tasks: Task[];
  column: string;
  showToast: (msg: string) => void;
}

export default function Column({ title, tasks, column, showToast }: Props) {
  const [visibleCount, setVisibleCount] = useState(5);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const visibleTasks = [...tasks].slice(0, visibleCount);

  // reset when tasks change
  useEffect(() => {
    setVisibleCount(5);
  }, [tasks]);

  // observer 
  useEffect(() => {
    const loader = loaderRef.current;

    if (!loader) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount((prev) => prev + 5);
      }
    });

    observer.observe(loader);

    return () => {
      observer.unobserve(loader);
    };
  }, []);

  const { setNodeRef } = useDroppable({
    id: column,
  });

  return (
    <div
      ref={setNodeRef}
      className="colm"
      style={{
        width: "23.5%",
        background: "#f4f4f4",
        padding: "10px",
        height: "500px",
        overflowY: "auto",
        borderRadius: "10px",
      }}
    >
      <h2 style={{fontSize:"25px" , fontWeight:"700",padding:"5px 0"}}>{title}</h2>

      {visibleTasks.map((task) => (
        <TaskCard key={task.id} task={task} showToast={showToast} />
      ))}

      {/* loader */}
      <div ref={loaderRef} style={{ height: "20px" }} />
    </div>
  );
}