import { Navigate } from 'react-router-dom'
import { authService } from '../services/authService.js'

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/" replace />
  }

  // Check JWT expiry
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      authService.clearAuth()
      return <Navigate to="/" replace />
    }
  } catch {
    authService.clearAuth()
    return <Navigate to="/" replace />
  }

  return children
}
