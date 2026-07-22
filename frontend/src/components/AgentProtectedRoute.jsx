import { Navigate } from 'react-router-dom'
import { authService } from '../services/authService.js'

export default function AgentProtectedRoute({ children }) {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  // Check JWT expiry
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      authService.clearAuth()
      return <Navigate to="/login" replace />
    }
  } catch {
    authService.clearAuth()
    return <Navigate to="/login" replace />
  }

  // Check role
  const user = authService.getStoredUser()
  if (!user || user.role !== 'agent') {
    // Redirect to appropriate panel based on role
    if (user?.role === 'admin') return <Navigate to="/admin/dashboard" replace />
    return <Navigate to="/app" replace />
  }

  return children
}
