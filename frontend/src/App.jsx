import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const TaskList = lazy(() => import('./pages/TaskList'))
const TaskCreate = lazy(() => import('./pages/TaskCreate'))
const TaskDetail = lazy(() => import('./pages/TaskDetail'))
const SubmissionList = lazy(() => import('./pages/SubmissionList'))
const SubmissionEvaluate = lazy(() => import('./pages/SubmissionEvaluate'))
const Profile = lazy(() => import('./pages/Profile'))

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
      <Suspense fallback={<p className="page-container">Loading...</p>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/tasks" element={<PrivateRoute><TaskList /></PrivateRoute>} />
          <Route path="/tasks/create" element={<PrivateRoute><TaskCreate /></PrivateRoute>} />
          <Route path="/tasks/:id" element={<PrivateRoute><TaskDetail /></PrivateRoute>} />
          <Route path="/submissions" element={<PrivateRoute><SubmissionList /></PrivateRoute>} />
          <Route path="/submissions/:id/evaluate" element={<PrivateRoute><SubmissionEvaluate /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>
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