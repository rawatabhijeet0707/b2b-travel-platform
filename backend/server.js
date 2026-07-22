import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import agentRoutes from './routes/agentRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false,
}))

// CORS
app.use(cors({
  origin: true,
  credentials: true,
}))

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'TravelDistrib API Server',
    docs: '/api/health',
    endpoints: {
      auth: '/api/auth',
      dashboard: '/api/dashboard',
      admin: '/api/admin',
      agent: '/api/agent',
    },
  })
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'TravelDistrib API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  })
})

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/agent', agentRoutes)
app.use('/api/payments', paymentRoutes)

// 404 handler
app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: 'API endpoint not found' })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  })
})

app.listen(PORT, () => {
  console.log('')
  console.log('╔═══════════════════════════════════════════╗')
  console.log('║  TravelDistrib API Server                 ║')
  console.log('║                                           ║')
  console.log(`║  Port: ${PORT}                                ║`)
  console.log(`║  Env:  ${process.env.NODE_ENV || 'development'}                        ║`)
  console.log(`║  URL:  http://localhost:${PORT}             ║`)
  console.log('╚═══════════════════════════════════════════╝')
  console.log('')
  console.log('Available endpoints:')
  console.log('  GET  /api/health')
  console.log('  POST /api/auth/send-otp')
  console.log('  POST /api/auth/verify-otp')
  console.log('  POST /api/auth/register')
  console.log('  POST /api/auth/login')
  console.log('  GET  /api/auth/me')
  console.log('  GET  /api/dashboard/stats')
  console.log('  GET  /api/dashboard/bookings')
  console.log('  GET  /api/dashboard/invoices')
  console.log('  GET  /api/dashboard/wallet/transactions')
  console.log('  GET  /api/dashboard/reports')
  console.log('  GET  /api/dashboard/tickets')
  console.log('  GET  /api/agent/dashboard')
  console.log('  GET  /api/agent/bookings')
  console.log('  GET  /api/agent/my-bookings')
  console.log('  GET  /api/agent/customers')
  console.log('  GET  /api/agent/earnings')
  console.log('  GET  /api/agent/wallet')
  console.log('  GET  /api/agent/transactions')
  console.log('  GET  /api/agent/reports')
  console.log('  GET  /api/agent/tickets')
  console.log('  GET  /api/agent/notifications')
  console.log('  GET  /api/agent/settings')
  console.log('')
})
