import { useState } from "react";
import { useTaskStore } from "../store/useTaskStore";

function AddTask() {
  const { addTask } = useTaskStore();

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = async () => {
    if (!title.trim()) return;

    await addTask({
      title,
      description,
    });

    setTitle("");
    setDescription("");
    setShow(false);
  };

  return (
    <>
      {/* Add Task Button */}
      <button
        className="btn btn-primary mb-3"
        onClick={() => setShow(true)}
      >
        Add Task
      </button>

      {/* Modal */}
      {show && (
        <div className="modal d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              
              <div className="modal-header">
                <h5 className="modal-title">Add Task</h5>
                <button
                  className="btn-close"
                  onClick={() => setShow(false)}
                ></button>
              </div>

              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShow(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-primary"
                  onClick={handleAdd}
                >
                  Add
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddTask;