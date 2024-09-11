import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './TaskManager.css';

const TaskView = () => {
    const { id } = useParams(); // Fetch task id from the URL
    const [task, setTask] = useState(null);

    const API_URL = 'http://localhost:5000/api/tasks';

    useEffect(() => {
        fetchTask();
    }, []);

    const fetchTask = async () => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            setTask(response.data);
        } catch (error) {
            console.error('Error fetching task:', error);
        }
    };

    if (!task) return <div>Loading...</div>;

    return (
        <div className="task-view-container">
            <h2>Task Details</h2>
            <p><strong>Title:</strong> {task.title}</p>
            <p><strong>Description:</strong> {task.description}</p>
            <Link to={`/tasks/edit/${task.id}`} className="edit-link">Edit</Link>
            <Link to={`/`} className="add-task-button">Home</Link>

        </div>
    );
};

export default TaskView;
