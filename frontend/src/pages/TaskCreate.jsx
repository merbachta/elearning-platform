import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

function TaskCreate() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/tasks/', formData)
      setSuccess('Task created successfully.')
      setTimeout(() => navigate('/tasks'), 2000)
    } catch (err) {
      setError('Error creating task. Make sure you are an evaluator.')
    }
  }

  return (
    <div className="page-container">
      <button className="btn btn-outline" onClick={() => navigate('/tasks')}>
        ← Back to tasks
      </button>
      <h2 style={{marginTop: '1rem'}}>Create Task</h2>
      {error && <p className="msg-error">{error}</p>}
      {success && <p className="msg-success">{success}</p>}
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" placeholder="Task title" value={formData.title} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" placeholder="Task description" value={formData.description} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label>Deadline</label>
            <input type="datetime-local" name="deadline" value={formData.deadline} onChange={handleChange}/>
          </div>
          <button type="submit" className="btn btn-primary"> Create Task</button>
        </form>
      </div>
    </div>
  )
}
export default TaskCreate