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
    <div>
      <h2>Submissions</h2>
      <button onClick={handleLogout}>Logout</button>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {submissions.length === 0 ? (
        <p>No submissions available.</p>
      ) : (
        <ul>
          {submissions.map(submission => (
            <li key={submission.id}>
              <p>Task: {submission.task_title}</p>
              <p>Student: {submission.student_username}</p>
              <p>Submitted: {new Date(submission.submitted_at).toLocaleDateString()}</p>
              <p>Grade: {submission.grade ?? 'Not graded yet'}</p>
              <p>Feedback: {submission.feedback ?? 'No feedback yet'}</p>
              <a href={submission.file} target="_blank">View file</a>
              {submission.status === 'pending' && userRole === 'evaluator' && (
              <button onClick={() => navigate(`/submissions/${submission.id}/evaluate`)}>
                 Evaluate
              </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
export default SubmissionList