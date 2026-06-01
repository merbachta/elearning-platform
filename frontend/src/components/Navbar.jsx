import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../services/api'
import api from '../services/api'

function Navbar() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/users/profile/')
        setUsername(response.data.username)
      } catch (err) {
        console.error('Error fetching profile')
      }
    }
    fetchProfile()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate('/tasks')}>
        📚 E-Learning Platform
      </div>
      <div className="navbar-links">
        <button className="nav-link" onClick={() => navigate('/tasks')}>
          Tasks
        </button>
        <button className="nav-link" onClick={() => navigate('/submissions')}>
          Submissions
        </button>
        <button className="nav-link" onClick={() => navigate('/profile')}>
          👤 {username}
        </button>
        <button className="nav-link btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar