import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import TaskList from './pages/TaskList'
import TaskDetail from './pages/TaskDetail'
import SubmissionList from './pages/SubmissionList'
import SubmissionEvaluate from './pages/SubmissionEvaluate'
import Profile from './pages/Profile'

function PrivateRoute({ children }) {
  const token = localStorage.getItem('access_token')
  return token ? children : <Navigate to="/login" />
}

function AppContent() {
  const location = useLocation()
  const noNavbar = ['/login', '/register']

  return (
    <>
      {!noNavbar.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/tasks" element={<PrivateRoute><TaskList /></PrivateRoute>} />
        <Route path="/tasks/:id" element={<PrivateRoute><TaskDetail /></PrivateRoute>} />
        <Route path="/submissions" element={<PrivateRoute><SubmissionList /></PrivateRoute>} />
        <Route path="/submissions/:id/evaluate" element={<PrivateRoute><SubmissionEvaluate /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
export default App