const db = require('../models/db');

// Get all tasks
exports.getTaskList = (req, res) => {
    const { q } = req.query; // Extract search query from request
    
    let query = 'SELECT * FROM tasks';
    let queryParams = [];

    if (q) {
        query += ' WHERE title LIKE ? OR description LIKE ?';
        queryParams = [`%${q}%`, `%${q}%`];
    }

    db.query(query, queryParams, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};


// Create a new task
exports.createTask = (req, res) => {
    const { title, description } = req.body;
    db.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json({ message: 'Task created', taskId: results.insertId });
    });
};


// Get task by id

exports.getTaskById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM tasks WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(results[0]);
    });
};


// Update a task
exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required.' });
    }

    const query = 'UPDATE tasks SET title = ?, description = ? WHERE id = ?';
    db.query(query, [title, description, id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        res.json({ message: 'Task updated successfully.' });
    });
};

// Delete a task
exports.deleteTask = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Task deleted' });
    });
};
