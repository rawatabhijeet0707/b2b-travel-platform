import mysql from 'mysql2/promise'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function initDatabase() {
  const host = process.env.DB_HOST || 'localhost'
  const port = process.env.DB_PORT || 3306
  const user = process.env.DB_USER || 'root'
  const password = process.env.DB_PASSWORD || ''
  const dbName = process.env.DB_NAME || 'travel_distrib'

  try {
    // Connect without database to create it
    const connection = await mysql.createConnection({ host, port, user, password })

    // Read and execute SQL file
    const sqlFile = fs.readFileSync(path.join(__dirname, 'initDatabase.sql'), 'utf8')
    const statements = sqlFile.split(';').filter(s => s.trim().length > 0)

    for (const stmt of statements) {
      await connection.query(stmt)
    }

    console.log('✓ Database and tables created successfully')

    // Create a proper test user with hashed password
    const testPassword = await bcrypt.hash('Test@1234', 10)
    await connection.query(
      `UPDATE travel_distrib.users SET password_hash = ? WHERE email = 'admin@traveldistrib.com'`,
      [testPassword]
    )
    console.log('✓ Test user password updated with proper hash')
    console.log('')
    console.log('═══════════════════════════════════════════')
    console.log('  TEST USER CREDENTIALS:')
    console.log('  Email:    admin@traveldistrib.com')
    console.log('  Mobile:   9876543210')
    console.log('  Password: Test@1234')
    console.log('═══════════════════════════════════════════')

    await connection.end()
    process.exit(0)
  } catch (error) {
    console.error('✗ Database initialization failed:', error.message)
    console.error('')
    console.error('Make sure MySQL is running and credentials in .env are correct.')
    process.exit(1)
  }
}

initDatabase()
