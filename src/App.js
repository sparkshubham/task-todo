import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import TaskEdit from './components/TaskEdit';
import TaskView from './components/TaskView';
import TaskList from './components/TaskList';
import TaskAdd from './components/TaskAdd';

const App = () => {
    return (
        <Router>
        <div>
            <Routes>
                <Route path="/" element={<TaskList />} />               {/* Use element prop */}
                <Route path="/tasks/:id" element={<TaskView />} />      {/* Use element prop */}
                <Route path="/tasks/edit/:id" element={<TaskEdit />} /> {/* Use element prop */}
                <Route path="/tasks/add" element={<TaskAdd />} /> {/* Add route for adding a new task */}
            
            </Routes>
        </div>
    </Router>
    );
};

export default App;
