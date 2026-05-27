import { useNavigate } from 'react-router-dom'
import { logout } from '../services/api'

function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div>
      <h2>Welcome to the E-Learning Platform</h2>
      <p>You are logged in.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard


