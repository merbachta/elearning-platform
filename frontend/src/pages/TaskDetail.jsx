import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTaskDetail, createSubmission } from '../services/api'

function TaskDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTaskDetail(id)
        setTask(response.data)
      } catch (err) {
        setError('Error loading task.')
      }
    }
    fetchTask()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createSubmission(task.id, file)
      setSuccess('Submission uploaded successfully.')
    } catch (err) {
      setError('Error submitting task.')
    }
  }

  if (!task) return <p className="page-container">Loading...</p>

return (
  <div className="page-container">
    <button className="btn btn-outline" onClick={() => navigate('/tasks')}>
      ← Back to tasks
    </button>
    <div className="card" style={{marginTop: '1rem'}}>
      <h2>{task.title}</h2>
      <p style={{color: 'var(--grey-dark)', marginTop: '0.5rem'}}>
        Deadline: {new Date(task.deadline).toLocaleDateString()}
      </p>
      <p style={{marginTop: '1rem'}}>{task.description}</p>
    </div>
    {error && <p className="msg-error">{error}</p>}
    {success && <p className="msg-success">{success}</p>}
    <div className="card">
      <h3>Submit your work</h3>
      <form onSubmit={handleSubmit} style={{marginTop: '1rem'}}>
        <div className="form-group">
          <label>Select file</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit task
        </button>
      </form>
    </div>
  </div>
)
}

export default TaskDetail