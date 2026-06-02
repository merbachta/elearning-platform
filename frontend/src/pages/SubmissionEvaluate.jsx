
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

  if (!submission) return <p className="page-container">Loading...</p>

return (
  <div className="page-container">
    <button className="btn btn-outline" onClick={() => navigate('/submissions')}>
      ← Back to submissions
    </button>
    <div className="card" style={{marginTop: '1rem'}}>
      <h2>Evaluate Submission</h2>
      <p><strong>Task:</strong> {submission.task_title}</p>
      <p><strong>Student:</strong> {submission.student_username}</p>
      <p><strong>Submitted:</strong> {new Date(submission.submitted_at).toLocaleDateString()}</p>
      <a href={submission.file} target="_blank" className="btn btn-outline" style={{marginTop: '0.8rem', display: 'inline-block'}}>
        View file
      </a>
    </div>
    {error && <p className="msg-error">{error}</p>}
    {success && <p className="msg-success">{success}</p>}
    <div className="card">
      <h3>Add evaluation</h3>
      <form onSubmit={handleSubmit} style={{marginTop: '1rem'}}>
        <div className="form-group">
          <label>Grade</label>
          <input
            type="number"
            placeholder="Grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            step="0.1"
          />
        </div>
        <div className="form-group">
          <label>Feedback</label>
          <textarea
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit evaluation
        </button>
      </form>
    </div>
  </div>
)
}
export default SubmissionEvaluate