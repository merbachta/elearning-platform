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

  if (!task) return <p>Loading...</p>

  return (
    <div>
      <button onClick={() => navigate('/tasks')}>Back to tasks</button>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {success && <p style={{color: 'green'}}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Submit task</button>
      </form>
    </div>
  )
}

export default TaskDetail