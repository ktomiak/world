import { Op } from "sequelize";
import Task from "../models/Task.js";
import User from "../models/User.js";
import { ROLES } from "../constants/roles.js";
import { TASK_STATUS } from "../constants/taskStatus.js";

// GET
export const getTasks = async (req, res) => {
  try {
    const where = { isGlobal: true };

    const tasks = await Task.findAll({
      where,
      include: [
        { model: User, as: "owner", attributes: ["username"] },
        { association: "admins", attributes: ["id", "username"] },
      ],
      order: [["deadline", "ASC"]],
    });

    res.json(tasks);
  } catch (err) {
    console.error("Błąd w getTasks:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getMyTasks = async (req, res) => {
  try {
    const where = {
      [Op.and]: [
        { isGlobal: false },
        { ownerId: req.user.id }
      ]
    };

    const tasks = await Task.findAll({
      where,
      include: [
        { model: User, as: "owner", attributes: ["username"] },
        { association: "admins", attributes: ["id", "username"] },
      ],
      order: [["deadline", "ASC"]],
    });

    res.json(tasks);
  } catch (err) {
    console.error("Błąd w getTasks:", err);
    res.status(500).json({ error: err.message });
  }
};

// POST
export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      startDate,
      deadline,
      endDate,
      dependsOnId,
      isGlobal,
      adminIds,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      startDate,
      deadline,
      endDate,
      dependsOnId,
      isGlobal,
      ownerId: req.user.id,
    });

    if (isGlobal && Array.isArray(adminIds) && adminIds.length > 0) {
      const admins = await User.findAll({ where: { id: adminIds, role: ROLES.ADMIN } });
      await task.setAdmins(admins);
    }

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: "Nie znaleziono zadania" });

    if (req.user.role !== ROLES.ADMIN && task.ownerId !== req.user.id) {
      return res.status(403).json({ error: "Brak uprawnień" });
    }

    const { status, ...rest } = req.body;

    if (status && status === TASK_STATUS.DONE) {
      rest.endDate = new Date();
    }

    await task.update({ ...rest, status });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
