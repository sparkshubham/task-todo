import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskManager.css';
import { Link, useNavigate } from 'react-router-dom';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(5); // Number of tasks per page
    const navigate = useNavigate();

    const API_URL = 'http://localhost:5000/api/tasks';

    useEffect(() => {
        fetchTasks();
    }, [search, currentPage]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${API_URL}?q=${search}`);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="task-list-container">
            <h2>Task List</h2>

            <button className="add-task-button" onClick={() => navigate('/tasks/add')}>
                Add Task
            </button>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>
            <table className="task-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>
                                <Link to={`/tasks/edit/${task.id}`} className="edit-link">Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }).map((_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)} className="page-button">
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TaskList;
