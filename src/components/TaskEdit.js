import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TaskForm from './TaskForm';

const TaskEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialTask, setInitialTask] = useState(null);
    const API_URL = 'http://localhost:5000/api/tasks';

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`${API_URL}/${id}`);
                setInitialTask(response.data);
            } catch (error) {
                console.error('Error fetching task:', error);
            }
        };
        fetchTask();
    }, [id]);

    const updateTask = async (taskData) => {
        try {
            await axios.put(`${API_URL}/${id}`, taskData);
            navigate(`/tasks/${id}`);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div>
            {initialTask && <TaskForm initialTask={initialTask} onSubmit={updateTask} isEdit={true} />}
        </div>
    );
};

export default TaskEdit;
