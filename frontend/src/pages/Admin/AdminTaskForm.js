import { useState, useEffect } from "react";
import { getAllAdminUsers, createTask, updateTask } from "../../api";

export default function AdminTaskForm({ from, token, task, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [ownerId, setOwnerId] = useState("");
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [isGlobal, setIsGlobal] = useState(from === "global");

  // Inicjalizacja stanu przy każdej zmianie `task`
  useEffect(() => {
    setTitle(task?.title || "");
    setDescription(task?.description || "");
    setStatus(task?.status || "pending");
    setOwnerId(task?.ownerId || "");
    setAdmins(task?.admins || []);
    setIsGlobal(task?.isGlobal ?? (from === "global"));
  }, [task, from]);

  useEffect(() => {
    getAllAdminUsers(token).then(setUsers).catch(console.error);
  }, [token]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const taskData = { title, description, status, ownerId, admins, isGlobal };

      if (task) {
        await updateTask(token, task.id, taskData);
      } else {
        await createTask(token, taskData);
      }

      await onSave(); // poczekaj aż lista się odświeży w rodzicu
    } catch (err) {
      console.error("Błąd zapisu zadania", err);
    }
  };

  return (
    <div className="modal">
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Tytuł"
          required
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Opis"
        />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select value={ownerId} onChange={e => setOwnerId(e.target.value)}>
          <option value="">Wybierz właściciela</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>
              {u.username}
            </option>
          ))}
        </select>
        <button type="submit">Zapisz</button>
        <button type="button" onClick={onClose}>Anuluj</button>
      </form>
    </div>
  );
}
