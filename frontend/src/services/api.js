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

// Tasks
export const getTasks = () => api.get('/tasks/')
export const getTaskDetail = (id) => api.get(`/tasks/${id}/`)

// Submissions
import imageCompression from 'browser-image-compression'

export const createSubmission = async (taskId, file) => {
  let fileToUpload = file

  const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  if (imageTypes.includes(file.type)) {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }
    const compressedBlob = await imageCompression(file, options)
    // Preservar el nombre original del archivo
    fileToUpload = new File([compressedBlob], file.name, { type: compressedBlob.type })
  }

  const formData = new FormData()
  formData.append('task', taskId)
  formData.append('file', fileToUpload)
  return api.post('/tasks/submissions/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const getSubmissions = () => api.get('/tasks/submissions/list/')

export const evaluateSubmission = (id, grade, feedback) =>
  api.patch(`/tasks/submissions/${id}/evaluate/`, { grade, feedback })


export default api