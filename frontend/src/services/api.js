import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let message = error.response?.data?.message || error.message || 'Network error'

    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      message = 'Server is taking too long to respond. Please make sure the backend server is running.'
    }

    // Redirect to login on 401
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      if (window.location.pathname.startsWith('/app') || window.location.pathname.startsWith('/agent')) {
        window.location.href = '/'
      }
    }

    return Promise.reject({ success: false, message, errors: error.response?.data?.errors })
  }
)

export default api
