import React, { useState, useEffect } from 'react';
import './App.css';
import CategoryManager from './components/CategoryManager';
import TaskManager from './components/TaskManager';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

function App() {
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories.php`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch tasks
  const fetchTasks = async (categoryId = null) => {
    try {
      setLoading(true);
      const url = categoryId 
        ? `${API_BASE_URL}/tasks.php?category_id=${categoryId}`
        : `${API_BASE_URL}/tasks.php`;
      const response = await axios.get(url);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchTasks();
  }, []);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchTasks(categoryId);
  };

  const handleCategoryChange = () => {
    fetchCategories();
    if (selectedCategory) {
      fetchTasks(selectedCategory);
    } else {
      fetchTasks();
    }
  };

  const handleTaskChange = () => {
    if (selectedCategory) {
      fetchTasks(selectedCategory);
    } else {
      fetchTasks();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Management System</h1>
        <p>Organize your tasks efficiently</p>
      </header>
      
      <div className="App-container">
        <div className="sidebar">
          <CategoryManager
            categories={categories}
            onCategoryChange={handleCategoryChange}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </div>
        
        <div className="main-content">
          <TaskManager
            tasks={tasks}
            categories={categories}
            selectedCategory={selectedCategory}
            onTaskChange={handleTaskChange}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

