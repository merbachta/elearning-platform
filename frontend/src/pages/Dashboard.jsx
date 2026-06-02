import { useNavigate } from 'react-router-dom'
import { logout } from '../services/api'

function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
  <div className="page-container">
    <div className="card">
      <h2>Welcome to the E-Learning Platform</h2>
      <p>Use the navigation bar to access your tasks and submissions.</p>
    </div>
  </div>
)
}

export default Dashboard


