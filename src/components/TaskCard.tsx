import { useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
import type { Task } from "../types/task";
import { useDraggable } from "@dnd-kit/core";

type Props = {
    task: Task;
    showToast: (msg: string) => void;
};

function TaskCard({ task, showToast }: Props) {
    const { removeTask, editTask } = useTaskStore();
    const [showEdit, setShowEdit] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    //   confirm before delete
    const [showDelete, setShowDelete] = useState(false);

    const handleUpdate = async () => {
        if (!title.trim() || !description.trim()) return;

        await editTask(task.id, {
            title,
            description,
        });

        setShowEdit(false);
    };

    const { attributes, listeners, setNodeRef } = useDraggable({
        id: task.id.toString(),
    });
    return (
        <>
          
            <div ref={setNodeRef} className="card p-2 mb-2 shadow-sm">

                {/* drag handle */}
                <div
                    {...listeners}
                    {...attributes}
                    style={{ cursor: "grab" }}
                >
                    <h6>{task.title}</h6>
                    <p>{task.description}</p>
                </div>
                <div className="d-flex gap-2">
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setShowEdit(true)}
                    >
                        Edit
                    </button>

                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => setShowDelete(true)}
                    >
                        Delete
                    </button>
                </div>

            </div>

            {/* Edit Modal */}
            {showEdit && (
                <div className="modal show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content p-3">

                            <h5>Edit Task</h5>

                            <input
                                className="form-control mb-2"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <textarea
                                className="form-control mb-2"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <div className="d-flex justify-content-end gap-2">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowEdit(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="btn btn-success"
                                    onClick={handleUpdate}
                                >
                                    Save
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
            {/* delete Modal */}
            {showDelete && (
                <div className="modal show d-block">
                    <div className="modal-dialog modal-dialog-top">
                        <div className="modal-content p-3">

                            <h5>Confirm Delete</h5>
                            <p>Are you sure you want to delete this task?</p>

                            <div className="d-flex justify-content-end gap-2">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowDelete(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="btn btn-danger"
                                    onClick={async () => {
                                        await removeTask(task.id);
                                        setShowDelete(false);
                                        showToast("Task deleted");
                                    }}
                                >
                                    Delete
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default TaskCard;