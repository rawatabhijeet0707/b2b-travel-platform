import mysql from 'mysql2/promise'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function initAdmin() {
  const host = process.env.DB_HOST || 'localhost'
  const port = process.env.DB_PORT || 3306
  const user = process.env.DB_USER || 'root'
  const password = process.env.DB_PASSWORD || ''
  const dbName = process.env.DB_NAME || 'travel_distrib'

  try {
    const connection = await mysql.createConnection({ host, port, user, password })

    const sqlFile = fs.readFileSync(path.join(__dirname, 'initAdmin.sql'), 'utf8')
    const statements = sqlFile.split(';').filter(s => s.trim().length > 0)

    for (const stmt of statements) {
      await connection.query(stmt)
    }

    console.log('\u2705 Admin tables created successfully')

    // Create proper password hash
    const adminPassword = await bcrypt.hash('Admin@123456', 10)
    await connection.query(
      `UPDATE ${dbName}.admin_users SET password_hash = ? WHERE email = 'admin@travelhub.com'`,
      [adminPassword]
    )

    console.log('\u2705 Default Super Admin password updated')
    console.log('')
    console.log('\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557')
    console.log('\u2551  DEFAULT ADMIN CREDENTIALS:                 \u2551')
    console.log('\u2551  Email:    admin@travelhub.com               \u2551')
    console.log('\u2551  Password: Admin@123456                     \u2551')
    console.log('\u2551  Role:     Super Admin                      \u2551')
    console.log('\u2551  URL:      http://localhost:5174/admin      \u2551')
    console.log('\u255a\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255d')

    await connection.end()
    process.exit(0)
  } catch (error) {
    console.error('\u274c Admin database initialization failed:', error.message)
    console.error('')
    console.error('Make sure MySQL is running and credentials in .env are correct.')
    console.error('')
    console.error('Note: If MySQL is not available, the admin panel will work in mock mode.')
    console.error('Default admin credentials in mock mode:')
    console.error('  Email:    admin@travelhub.com')
    console.error('  Password: Admin@123456')
    process.exit(1)
  }
}

initAdmin()
