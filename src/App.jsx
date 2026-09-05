import { useState } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  function addTask() {
    if (task.trim() === '') return

    setTasks([...tasks, { id: Date.now(), text: task, done: false }])
    setTask('')
  }

  function toggleTask(id) {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ))
  }

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <div className="app">
      <h1>My To-Do List</h1>

      <div className="input-row">
        <input
          value={task}
          onChange={e => setTask(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
          placeholder="Enter a task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="task-list">
        {tasks.length === 0 && <p className="empty">No tasks yet.</p>}

        {tasks.map(t => (
          <div className="task" key={t.id}>
            <label>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleTask(t.id)}
              />
              <span className={t.done ? 'done' : ''}>{t.text}</span>
            </label>
            <button className="delete" onClick={() => deleteTask(t.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
