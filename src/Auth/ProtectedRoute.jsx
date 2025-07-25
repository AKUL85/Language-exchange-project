import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthProvider'
import LoadingSpinner from '../component/LoadingSpinner'



function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute