const express = require('express');

const { updateTasks, deleteTasks } = require('../controllers/task.controller');
const { createTask } = require('../controllers/task.controller');
const { getAlltasks } = require('../controllers/task.controller');
const router = express.Router();

router.get("/tasks/", getAlltasks);
router.post("/tasks/", createTask);
router.put("/tasks/", updateTasks);
router.delete("/tasks/", deleteTasks);

module.exports = router;