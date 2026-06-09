import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTasks } from '../services/api'
import api from '../services/api'

function TaskList() {
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState('')
  const [userRole, setUserRole] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const [tasksResponse, profileResponse] = await Promise.all([
          getTasks(),
          api.get('/users/profile/')
        ])
        setTasks(tasksResponse.data)
        setUserRole(profileResponse.data.role)
      } catch (err) {
        setError('Error loading tasks.')
      }
    }
    fetchTasks()
  }, [])

  return (
    <div className="page-container">
      <h2>Tasks</h2>
      {error && <p className="msg-error">{error}</p>}
      {userRole === 'evaluator' && (
        <button
          className="btn btn-secondary"
          onClick={() => navigate('/tasks/create')}
          style={{marginBottom: '1rem'}}
        >
          + Create Task
        </button>
      )}
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul style={{listStyle: 'none', padding: 0}}>
          {tasks.map(task => (
            <li
              key={task.id}
              className="list-item"
              onClick={() => navigate(`/tasks/${task.id}`)}
            >
              <h3>{task.title}</h3>
              <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TaskList