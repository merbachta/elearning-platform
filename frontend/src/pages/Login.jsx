import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/api'

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(formData.username, formData.password)
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid username or password.')
    }
  }

  return (
  <div className="auth-container">
    <div className="auth-card">
      <h2>Login</h2>
      {error && <p className="msg-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
          Login
        </button>
      </form>
      <p className="auth-footer">
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  </div>
)
}
export default Login