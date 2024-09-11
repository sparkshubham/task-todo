import React, { useState, useEffect } from 'react';

const TaskForm = ({ initialTask, onSubmit, isEdit }) => {
    const [taskData, setTaskData] = useState({ title: '', description: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialTask) {
            setTaskData(initialTask);
        }
    }, [initialTask]);

    const handleChange = (e) => {
        setTaskData({ ...taskData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!taskData.title || !taskData.description) {
            setError('Both title and description are required');
            return;
        }
        onSubmit(taskData);
    };

    return (
        <div className="task-form-container">
            <h2>{isEdit ? 'Edit Task' : 'Add Task'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Task title"
                    value={taskData.title}
                    onChange={handleChange}
                    className="input-field"
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Task description"
                    value={taskData.description}
                    onChange={handleChange}
                    className="input-field"
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="save-button">
                    {isEdit ? 'Update Task' : 'Add Task'}
                </button>
            </form>
        </div>
    );
};

export default TaskForm;
