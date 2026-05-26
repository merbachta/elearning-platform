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
    <div>
      <h2>Register</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="evaluator">Evaluator</option>
        </select>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  )
}

export default Register