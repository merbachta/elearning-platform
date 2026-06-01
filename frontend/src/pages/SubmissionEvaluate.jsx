
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSubmissions, evaluateSubmission } from '../services/api'

function SubmissionEvaluate() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [submission, setSubmission] = useState(null)
  const [grade, setGrade] = useState('')
  const [feedback, setFeedback] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await getSubmissions()
        const found = response.data.find(s => s.id === parseInt(id))
        setSubmission(found)
      } catch (err) {
        setError('Error loading submission.')
      }
    }
    fetchSubmission()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await evaluateSubmission(id, grade, feedback)
      setSuccess('Submission evaluated successfully.')
      setTimeout(() => navigate('/submissions'), 2000)
    } catch (err) {
      setError('Error evaluating submission.')
    }
  }

  if (!submission) return <p>Loading...</p>

  return (
    <div>
      <button onClick={() => navigate('/submissions')}>Back to submissions</button>
      <h2>Evaluate Submission</h2>
      <p>Task: {submission.task_title}</p>
      <p>Student: {submission.student_username}</p>
      <p>Submitted: {new Date(submission.submitted_at).toLocaleDateString()}</p>
      <a href={submission.file} target="_blank">View file</a>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {success && <p style={{color: 'green'}}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          step="0.1"
        />
        <textarea
          placeholder="Feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button type="submit">Submit evaluation</button>
      </form>
    </div>
  )
}
export default SubmissionEvaluate