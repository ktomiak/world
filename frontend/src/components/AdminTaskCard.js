import { useState } from "react";
import AdminTaskForm from "../pages/Admin/AdminTaskForm";
import "../styles/admin.css";

const STATUS_COLORS = {
  todo: "#f0ad4e",
  in_progress: "#5bc0de",
  done: "#5cb85c",
};

export default function AdminTaskCard({ task, token, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing(true);
  const handleClose = () => setIsEditing(false);
  const handleSave = () => {
    setIsEditing(false);
    onEdit(); // odśwież listę po edycji
  };

  return (
    <div className="task-card" style={{ borderLeft: `5px solid ${STATUS_COLORS[task.status] || "#ccc"}` }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      {task.dependsOn && (
        <p className="dependency">Wymaga ukończenia: {task.dependsOn.title}</p>
      )}
      <div className="task-buttons">
        <button onClick={handleEdit}>Edytuj</button>
        <button onClick={() => alert("Dodawanie zależności")}>Dodaj zależność</button>
      </div>

      {isEditing && (
        <AdminTaskForm task={task} token={token} onClose={handleClose} onSave={handleSave} />
      )}
    </div>
  );
}
