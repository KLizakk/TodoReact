import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Task {
  text: string;
  date: string;
  type: 'daily' | 'regular';
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>("");
  const [type, setType] = useState<'daily' | 'regular'>('regular');

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = () => {
    const newTask: Task = { text: task, date: new Date().toLocaleDateString(), type };
    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    })
      .then(response => response.json())
      .then(data => setTasks([...tasks, data]));
    setTask("");
  };

  const deleteTask = (index: number) => {
    fetch(`http://localhost:5000/tasks/${index}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.status === 204) {
          setTasks(tasks.filter((_, i) => i !== index));
        }
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">ToDo List</h1>
      <div className="mb-4">
        <input
          className="border p-2 mr-2 w-full mb-2"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <select
          className="border p-2 mr-2 w-full mb-2"
          value={type}
          onChange={(e) => setType(e.target.value as 'daily' | 'regular')}
        >
          <option value="daily">Daily</option>
          <option value="regular">Regular</option>
        </select>
        <button
          className="bg-blue-500 text-white p-2 w-full"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
      <ul className="list-disc list-inside">
        {tasks.map((task, index) => (
          <li key={index} className="mb-2 flex justify-between items-center">
            <Link to={`/task/${index}`} className="font-semibold">{task.text}</Link> - {task.date} ({task.type})
            <button
              className="bg-red-500 text-white p-1 ml-2"
              onClick={() => deleteTask(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
