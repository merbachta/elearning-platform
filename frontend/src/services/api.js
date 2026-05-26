import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api'

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const register = (username, email, password, role) =>
  api.post('/users/register/', { username, email, password, role })

export const login = async (username, password) => {
  const response = await api.post('/token/', { username, password })
  localStorage.setItem('access_token', response.data.access)
  localStorage.setItem('refresh_token', response.data.refresh)
  return response
}

export const logout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}
export default api