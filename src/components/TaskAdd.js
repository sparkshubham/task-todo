import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm';

const TaskAdd = () => {
    const navigate = useNavigate();
    const API_URL = 'http://localhost:5000/api/tasks';

    const addTask = async (taskData) => {
        try {
            await axios.post(API_URL, taskData);
            navigate('/');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <div>
            <TaskForm onSubmit={addTask} isEdit={false} />
        </div>
    );
};

export default TaskAdd;
