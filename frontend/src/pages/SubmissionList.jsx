import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSubmissions, logout } from '../services/api'

function SubmissionList() {
  const [submissions, setSubmissions] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await getSubmissions()
        setSubmissions(response.data)
      } catch (err) {
        setError('Error loading submissions.')
      }
    }
    fetchSubmissions()
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
              <p>Task: {submission.task}</p>
              <p>Student: {submission.student}</p>
              <p>Status: {submission.status}</p>
              <p>Grade: {submission.grade ?? 'Not graded yet'}</p>
              <a href={submission.file} target="_blank">View file</a>
              {submission.status === 'pending' && (
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