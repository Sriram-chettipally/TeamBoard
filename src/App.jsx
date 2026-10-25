
import { useState } from 'react'
import './App.css'

const initialTasks = [
  { id: 1, title: 'Design landing page', category: 'Design', priority: 'High', done: true },
  { id: 2, title: 'Build authentication UI', category: 'Development', priority: 'High', done: false },
  { id: 3, title: 'Review project requirements', category: 'Planning', priority: 'Medium', done: false },
  { id: 4, title: 'Prepare team presentation', category: 'Meeting', priority: 'Low', done: false },
]

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [newTask, setNewTask] = useState('')

  const completed = tasks.filter((task) => task.done).length
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0

  function addTask(event) {
    event.preventDefault()
    if (!newTask.trim()) return

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask.trim(),
        category: 'General',
        priority: 'Medium',
        done: false,
      },
    ])
    setNewTask('')
  }

  function toggleTask(id) {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    ))
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-icon">T</span> TeamBoard</div>
        <p className="menu-label">WORKSPACE</p>
        <div className="nav-item active">▦ &nbsp; Overview</div>
        <div className="nav-item">☷ &nbsp; My Tasks</div>
        <div className="nav-item">◷ &nbsp; Activity</div>
        <div className="sidebar-bottom">
          <div className="avatar">SR</div>
          <div><strong>Team Member</strong><small>Project workspace</small></div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <span>Workspace / Overview</span>
          <div className="topbar-user"><span className="online-dot" /> Team workspace</div>
        </header>

        <section className="welcome">
          <div>
            <p className="eyebrow">MONDAY WORKSPACE</p>
            <h1>TeamBoard Workspace</h1>
            <p className="subtitle">Plan your work, track tasks, and celebrate progress together.</p>          </div>
          <div className="date-card"><span>YOUR PROJECT</span><strong>TeamBoard</strong><small>Let's make progress today.</small></div>
        </section>

        <section className="stats-grid">
          <div className="stat-card"><span>Total tasks</span><strong>{tasks.length}</strong><small>Tasks in your workspace</small></div>
          <div className="stat-card"><span>Completed</span><strong>{completed}</strong><small>Tasks finished</small></div>
          <div className="stat-card"><span>In progress</span><strong>{tasks.length - completed}</strong><small>Tasks remaining</small></div>
          <div className="stat-card"><span>Overall progress</span><strong>{progress}%</strong><div className="progress-track"><div style={{ width: `${progress}%` }} /></div></div>
        </section>

        <section className="tasks-section">
          <div className="section-heading">
            <div><h2>My tasks</h2><p>Small steps lead to big results.</p></div>
            <span className="task-count">{tasks.length} tasks</span>
          </div>

          <form className="add-task-form" onSubmit={addTask}>
            <input value={newTask} onChange={(event) => setNewTask(event.target.value)} placeholder="What needs to get done?" aria-label="New task title" />
            <button type="submit">+ Add task</button>
          </form>

          <div className="task-list">
            {tasks.map((task) => (
              <div className={`task-row ${task.done ? 'task-done' : ''}`} key={task.id}>
                <button className={`check-button ${task.done ? 'checked' : ''}`} onClick={() => toggleTask(task.id)} aria-label={`Mark ${task.title} ${task.done ? 'incomplete' : 'complete'}`}>
                  {task.done ? '✓' : ''}
                </button>
                <div className="task-info"><strong>{task.title}</strong><small>{task.category}</small></div>
                <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
              </div>
            ))}
          </div>
        </section>

        <footer>TeamBoard · Learn, build, and collaborate.</footer>
      </main>
    </div>
  )
}

export default App
