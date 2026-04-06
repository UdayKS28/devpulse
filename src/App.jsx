import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { CircularProgress, Box } from '@mui/material'
import Layout from './components/layout/Layout'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Trending from './Pages/Trending'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  const { loading } = useAuth()

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user/:username" element={<Profile />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}