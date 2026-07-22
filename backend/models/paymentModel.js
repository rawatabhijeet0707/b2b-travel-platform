import { query, mockDb, isMockMode } from '../config/db.js'

const mockTransactions = []

export async function createTransaction(data) {
  const {
    payment_id, order_id, booking_type, booking_id,
    user_id, agent_id, amount, currency, status,
    gateway, gateway_response, signature,
  } = data

  if (isMockMode()) {
    const txn = {
      id: mockTransactions.length + 1,
      payment_id: payment_id || null,
      order_id,
      booking_type,
      booking_id: booking_id || null,
      user_id,
      agent_id: agent_id || null,
      amount,
      currency: currency || 'INR',
      status,
      gateway: gateway || 'razorpay',
      gateway_response: gateway_response ? JSON.stringify(gateway_response) : null,
      signature: signature || null,
      created_at: new Date(),
      updated_at: new Date(),
    }
    mockTransactions.push(txn)
    return txn
  }

  const result = await query(
    `INSERT INTO payment_transactions (
      payment_id, order_id, booking_type, booking_id,
      user_id, agent_id, amount, currency, status,
      gateway, gateway_response, signature
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      payment_id || null, order_id, booking_type, booking_id || null,
      user_id, agent_id || null, amount, currency || 'INR', status,
      gateway || 'razorpay',
      gateway_response ? JSON.stringify(gateway_response) : null,
      signature || null,
    ]
  )

  return { id: result.insertId, ...data }
}

export async function updateTransaction(id, updates) {
  if (isMockMode()) {
    const txn = mockTransactions.find(t => t.id === id)
    if (txn) Object.assign(txn, updates, { updated_at: new Date() })
    return txn
  }

  const fields = []
  const values = []
  for (const [key, value] of Object.entries(updates)) {
    fields.push(`${key} = ?`)
    values.push(typeof value === 'object' ? JSON.stringify(value) : value)
  }
  fields.push('updated_at = NOW()')
  values.push(id)

  await query(`UPDATE payment_transactions SET ${fields.join(', ')} WHERE id = ?`, values)
  return getTransactionById(id)
}

export async function getTransactionById(id) {
  if (isMockMode()) {
    return mockTransactions.find(t => t.id === id) || null
  }

  const rows = await query('SELECT * FROM payment_transactions WHERE id = ? LIMIT 1', [id])
  return rows[0] || null
}

export async function getTransactionByOrderId(orderId) {
  if (isMockMode()) {
    return mockTransactions.find(t => t.order_id === orderId) || null
  }

  const rows = await query('SELECT * FROM payment_transactions WHERE order_id = ? LIMIT 1', [orderId])
  return rows[0] || null
}

export async function getTransactionByPaymentId(paymentId) {
  if (isMockMode()) {
    return mockTransactions.find(t => t.payment_id === paymentId) || null
  }

  const rows = await query('SELECT * FROM payment_transactions WHERE payment_id = ? LIMIT 1', [paymentId])
  return rows[0] || null
}

export async function getUserTransactions(userId, page = 1, limit = 20) {
  if (isMockMode()) {
    const userTxns = mockTransactions.filter(t => t.user_id === userId)
    const offset = (page - 1) * limit
    return {
      transactions: userTxns.slice(offset, offset + limit),
      pagination: {
        page, limit,
        total: userTxns.length,
        totalPages: Math.ceil(userTxns.length / limit),
      },
    }
  }

  const offset = (page - 1) * limit
  const rows = await query(
    'SELECT * FROM payment_transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
    [userId, limit, offset]
  )
  const countRows = await query(
    'SELECT COUNT(*) as total FROM payment_transactions WHERE user_id = ?',
    [userId]
  )
  return {
    transactions: rows,
    pagination: {
      page, limit,
      total: countRows[0]?.total || 0,
      totalPages: Math.ceil((countRows[0]?.total || 0) / limit),
    },
  }
}

export async function getAllTransactions(page = 1, limit = 20, filters = {}) {
  if (isMockMode()) {
    let txns = [...mockTransactions]
    if (filters.status) txns = txns.filter(t => t.status === filters.status)
    if (filters.booking_type) txns = txns.filter(t => t.booking_type === filters.booking_type)
    const offset = (page - 1) * limit
    return {
      transactions: txns.slice(offset, offset + limit),
      pagination: {
        page, limit,
        total: txns.length,
        totalPages: Math.ceil(txns.length / limit),
      },
    }
  }

  let sql = 'SELECT * FROM payment_transactions WHERE 1=1'
  const params = []

  if (filters.status) {
    sql += ' AND status = ?'
    params.push(filters.status)
  }
  if (filters.booking_type) {
    sql += ' AND booking_type = ?'
    params.push(filters.booking_type)
  }

  sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'
  params.push(limit, (page - 1) * limit)

  const rows = await query(sql, params)

  let countSql = 'SELECT COUNT(*) as total FROM payment_transactions WHERE 1=1'
  const countParams = []
  if (filters.status) {
    countSql += ' AND status = ?'
    countParams.push(filters.status)
  }
  if (filters.booking_type) {
    countSql += ' AND booking_type = ?'
    countParams.push(filters.booking_type)
  }
  const countRows = await query(countSql, countParams)

  return {
    transactions: rows,
    pagination: {
      page, limit,
      total: countRows[0]?.total || 0,
      totalPages: Math.ceil((countRows[0]?.total || 0) / limit),
    },
  }
}

export async function getPaymentStats() {
  if (isMockMode()) {
    const total = mockTransactions.length
    const success = mockTransactions.filter(t => t.status === 'success')
    const failed = mockTransactions.filter(t => t.status === 'failed')
    const refunded = mockTransactions.filter(t => t.status === 'refunded')
    const totalAmount = success.reduce((s, t) => s + t.amount, 0)
    return {
      total,
      success: success.length,
      failed: failed.length,
      refunded: refunded.length,
      totalAmount,
    }
  }

  const rows = await query(`
    SELECT
      COUNT(*) as total,
      SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) as success,
      SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed,
      SUM(CASE WHEN status = 'refunded' THEN 1 ELSE 0 END) as refunded,
      SUM(CASE WHEN status = 'success' THEN amount ELSE 0 END) as totalAmount
    FROM payment_transactions
  `)
  return rows[0] || { total: 0, success: 0, failed: 0, refunded: 0, totalAmount: 0 }
}
