import { useEffect, useState } from "react";
import { getMyTasks } from "../../api";
import AdminTaskCard from "../../components/AdminTaskCard";
import NavbarAdmin from "../../components/NavbarAdmin";
import AdminTaskForm from "./AdminTaskForm";
import "../../styles/admin.css";

export default function AdminTasks({ token }) {
  const  from="private";
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const data = await getMyTasks(token);
      setTasks(data);
    } catch (err) {
      console.error("Błąd pobierania zadań", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token]);

  const handleAdd = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  const handleSave = async () => {
    await fetchTasks();
    setShowForm(false);
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="admin-tasks-header">
        <h2>📋 Moje Prywatne Zadania</h2>
        <button className="add-btn" onClick={handleAdd}>➕ Dodaj zadanie</button>
      </div>

      <div className="tasks-grid">
        {tasks.length === 0 ? (
          <p>Brak zadań.</p>
        ) : (
          tasks.map(task => (
            <AdminTaskCard
              from={from}
              key={task.id}
              task={task}
              token={token}
              onEdit={() => handleEdit(task)}
            />
          ))
        )}
      </div>

      {showForm && (
	  <AdminTaskForm
	    key={editingTask?.id || "new"}
	    from={from}
	    token={token}
	    task={editingTask}
	    onClose={handleClose}
	    onSave={handleSave}
	  />
)}
    </div>
  );
}
