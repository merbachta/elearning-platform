import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../services/api'

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student'
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(formData.username, formData.email, formData.password, formData.role)
      navigate('/login')
    } catch (err) {
      setError('Registration failed. Please try again.')
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>
        {error && <p className="msg-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="evaluator">Evaluator</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
            Register
          </button>
        </form>
        <p className="auth-footer"> Already have an account? <a href="/login">Login</a> </p>
      </div>
    </div>
  )
}
export default Register