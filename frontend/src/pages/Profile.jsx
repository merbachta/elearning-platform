import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

function Profile() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/users/profile/')
        setFormData({
          username: response.data.username,
          email: response.data.email,
          role: response.data.role
        })
      } catch (err) {
        setError('Error loading profile.')
      }
    }
    fetchProfile()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.patch('/users/profile/', {
        username: formData.username,
        email: formData.email
      })
      setSuccess('Profile updated successfully.')
    } catch (err) {
      setError('Error updating profile.')
    }
  }

  return (
  <div className="page-container">
    <button className="btn btn-outline" onClick={() => navigate(-1)}>
      ← Back
    </button>
    <h2 style={{marginTop: '1rem'}}>My Profile</h2>
    {error && <p className="msg-error">{error}</p>}
    {success && <p className="msg-success">{success}</p>}
    <div className="card">
      <p><strong>Role:</strong> {formData.role}</p>
    </div>
    <div className="card">
      <h3>Edit profile</h3>
      <form onSubmit={handleSubmit} style={{marginTop: '1rem'}}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save changes
        </button>
      </form>
    </div>
  </div>
)
}

export default Profile