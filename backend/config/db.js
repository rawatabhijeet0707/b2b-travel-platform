import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import { mockDb } from './mockDb.js'

dotenv.config()

let pool = null
let useMock = false

// If no DB credentials configured, skip MySQL entirely
if (!process.env.DB_PASSWORD && !process.env.DB_HOST) {
  useMock = true
} else {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'travel_distrib',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    })
  } catch (e) {
    useMock = true
  }
}

// Test connection on startup
if (!useMock && pool) {
  pool.execute('SELECT 1').catch((e) => {
    console.warn('\u26a0\ufe0f MySQL not available, switching to mock mode')
    useMock = true
  })
}

export async function query(sql, params = []) {
  if (useMock) throw new Error('MOCK_MODE')
  try {
    const [rows] = await pool.execute(sql, params)
    return rows
  } catch (error) {
    if (error.code === 'ECONNREFUSED' || error.code === 'ER_ACCESS_DENIED_ERROR' || error.code === 'ER_BAD_DB_ERROR') {
      console.warn('\u26a0\ufe0f MySQL not available, switching to mock mode')
      useMock = true
    }
    throw error
  }
}

export async function getConnection() {
  if (useMock) return null
  return pool.getConnection()
}

export function isMockMode() {
  return useMock
}

export { mockDb }
export default pool
