const express = require('express');
const { getTaskList, createTask, deleteTask,updateTask,getTaskById } = require('../controllers/taskController');

const router = express.Router();


router.post('/', createTask);

router.get('/:id', getTaskById);

router.get('/', getTaskList);

router.put('/:id', updateTask);

router.delete('/:id', deleteTask);

module.exports = router;
