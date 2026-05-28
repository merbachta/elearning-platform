import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import TaskList from './pages/TaskList'
import TaskDetail from './pages/TaskDetail'
import SubmissionList from './pages/SubmissionList'
import SubmissionEvaluate from './pages/SubmissionEvaluate'

function PrivateRoute({ children }) {
  const token = localStorage.getItem('access_token')
  return token ? children : <Navigate to="/login" />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />
        <Route path="/tasks" element={
          <PrivateRoute><TaskList /></PrivateRoute>
        } />
        <Route path="/tasks/:id" element={
          <PrivateRoute><TaskDetail /></PrivateRoute>
        } />
        <Route path="/submissions" element={
          <PrivateRoute><SubmissionList /></PrivateRoute>
        } />
        <Route path="/submissions/:id/evaluate" element={
          <PrivateRoute><SubmissionEvaluate /></PrivateRoute>
        } />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App