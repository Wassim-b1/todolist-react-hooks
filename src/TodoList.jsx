import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editedTaskIndex, setEditedTaskIndex] = useState(null);
  const [editedTaskValue, setEditedTaskValue] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const startEdit = (index, task) => {
    setEditedTaskIndex(index);
    setEditedTaskValue(task);
  };

  const updateTask = () => {
    if (editedTaskIndex !== null && editedTaskValue.trim() !== '') {
      const confirmation = window.confirm('Do you want to update this task?');
      if (confirmation) {
        const updatedTasks = [...tasks];
        updatedTasks[editedTaskIndex] = editedTaskValue;
        setTasks(updatedTasks);
        setEditedTaskIndex(null);
        setEditedTaskValue('');
      }else{
        setEditedTaskIndex(null);
      }
    }
  };

  return (
    <div className='container'>
      <h1>To-Do List Using React Hooks</h1>

      <div className="content">

        <div className="typing">
          <input type="text" value={newTask} onChange={handleInputChange} placeholder="Add a new task" />
          <button onClick={addTask}>Add Task</button>
        </div>

        <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {editedTaskIndex === index ? (
              <div className='editText'>
                <input
                  type="text"
                  value={editedTaskValue}
                  onChange={(e) => setEditedTaskValue(e.target.value)}
                />
                <button onClick={updateTask}>Update</button>
              </div>
            ) : (
              <div className='view'>
                <div className="text">
                  {task}
                </div>
                <div className="buttons">
                  <button className='edit' onClick={() => startEdit(index, task)}>Edit</button>
                  <button className='delete' onClick={() => deleteTask(index)}>Delete</button>
                </div>
               
              </div>
            )}
          </li>
        ))}
      </ul>

      </div>
      
    </div>
  );
};

export default TodoApp;