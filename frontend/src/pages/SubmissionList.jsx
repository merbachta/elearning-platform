import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSubmissions, logout } from '../services/api'
import api from '../services/api'

function SubmissionList() {
  const [submissions, setSubmissions] = useState([])
  const [error, setError] = useState('')
  const [userRole, setUserRole] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subsResponse, profileResponse] = await Promise.all([
          getSubmissions(),
          api.get('/users/profile/')
        ])
        setSubmissions(subsResponse.data)
        setUserRole(profileResponse.data.role)
      } catch (err) {
        setError('Error loading submissions.')
      }
    }
    fetchData()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
  <div className="page-container">
    <h2>Submissions</h2>
    {error && <p className="msg-error">{error}</p>}
    {submissions.length === 0 ? (
      <p>No submissions available.</p>
    ) : (
      <ul style={{listStyle: 'none', padding: 0}}>
        {submissions.map(submission => (
          <li key={submission.id} className="list-item" style={{cursor: 'default'}}>
            <h3>{submission.task_title}</h3>
            <p><strong>Student:</strong> {submission.student_username}</p>
            <p><strong>Submitted:</strong> {new Date(submission.submitted_at).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {submission.status}</p>
            <p><strong>Grade:</strong> {submission.grade ?? 'Not graded yet'}</p>
            <p><strong>Feedback:</strong> {submission.feedback ?? 'No feedback yet'}</p>
            <div style={{marginTop: '0.8rem', display: 'flex', gap: '0.5rem'}}>
              <a href={submission.file} target="_blank" className="btn btn-outline">
                View file
              </a>
              <a href={submission.file} download className="btn btn-secondary">
                Download
              </a>
              {submission.status === 'pending' && userRole === 'evaluator' && (
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate(`/submissions/${submission.id}/evaluate`)}
                >
                  Evaluate
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
)
}
export default SubmissionList