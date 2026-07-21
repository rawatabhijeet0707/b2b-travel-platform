import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users, Search, Filter, CheckCircle2, XCircle, Clock, Wallet,
  Eye, Ban, RotateCcw, FileCheck, X
} from 'lucide-react'
import { adminService } from '../../services/adminService.js'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [kycFilter, setKycFilter] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [walletAmount, setWalletAmount] = useState('')

  useEffect(() => { loadUsers() }, [])

  const loadUsers = async () => {
    setLoading(true)
    try {
      const res = await adminService.getUsers()
      setUsers(res.data || [])
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  const filtered = users.filter(u => {
    if (search && !u.full_name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false
    if (statusFilter && u.account_status !== statusFilter) return false
    if (kycFilter && u.kyc_status !== kycFilter) return false
    return true
  })

  const handleStatusChange = async (id, status) => {
    try {
      await adminService.updateUserStatus(id, status)
      loadUsers()
    } catch (e) { console.error(e) }
  }

  const handleKycChange = async (id, status) => {
    try {
      await adminService.updateUserKyc(id, status)
      loadUsers()
    } catch (e) { console.error(e) }
  }

  const handleWalletUpdate = async (id) => {
    if (!walletAmount) return
    try {
      await adminService.updateWallet(id, parseFloat(walletAmount))
      setWalletAmount('')
      setSelectedUser(null)
      loadUsers()
    } catch (e) { console.error(e) }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-heading">User Management</h1>
        <p className="text-sm text-text-secondary mt-0.5">Manage all agents and customers</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or agency..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-heading placeholder:text-text-tertiary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
          />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
        <select value={kycFilter} onChange={(e) => setKycFilter(e.target.value)} className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
          <option value="">All KYC</option>
          <option value="verified">Verified</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">User</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Agency</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden md:table-cell">Wallet</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">KYC</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-right text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" className="text-center py-12 text-text-tertiary text-sm">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-12 text-text-tertiary text-sm">No users found</td></tr>
              ) : filtered.map((user, i) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {user.full_name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-heading truncate">{user.full_name}</p>
                        <p className="text-xs text-text-tertiary truncate">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <p className="text-sm text-text-secondary">{user.agency_name}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <p className="text-sm font-semibold text-heading">{"\u20B9"}{user.wallet_balance.toLocaleString('en-IN')}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                      user.kyc_status === 'verified' ? 'text-green-600 bg-green-50 border border-green-200' :
                      user.kyc_status === 'pending' ? 'text-amber-600 bg-amber-50 border border-amber-200' :
                      'text-red-600 bg-red-50 border border-red-200'
                    }`}>
                      {user.kyc_status === 'verified' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {user.kyc_status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                      user.account_status === 'active' ? 'text-green-600 bg-green-50 border border-green-200' :
                      'text-red-600 bg-red-50 border border-red-200'
                    }`}>
                      {user.account_status === 'active' ? <CheckCircle2 className="w-3 h-3" /> : <Ban className="w-3 h-3" />}
                      {user.account_status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setSelectedUser(user)} className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-text-secondary hover:text-primary" title="View & Manage">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      {user.account_status === 'active' ? (
                        <button onClick={() => handleStatusChange(user.id, 'suspended')} className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-text-secondary hover:text-red-500" title="Suspend">
                          <Ban className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button onClick={() => handleStatusChange(user.id, 'active')} className="w-7 h-7 rounded-lg hover:bg-green-50 flex items-center justify-center text-text-secondary hover:text-green-500" title="Activate">
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {user.kyc_status === 'pending' && (
                        <button onClick={() => handleKycChange(user.id, 'verified')} className="w-7 h-7 rounded-lg hover:bg-green-50 flex items-center justify-center text-text-secondary hover:text-green-500" title="Approve KYC">
                          <FileCheck className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedUser(null)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-heading">User Details</h3>
                <button onClick={() => setSelectedUser(null)} className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center">
                  <X className="w-4 h-4 text-text-secondary" />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center text-white text-xl font-bold">
                  {selectedUser.full_name.charAt(0)}
                </div>
                <div>
                  <p className="text-base font-bold text-heading">{selectedUser.full_name}</p>
                  <p className="text-sm text-text-secondary">{selectedUser.email}</p>
                  <p className="text-xs text-text-tertiary">{selectedUser.mobile}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-xs text-text-tertiary">Agency</p>
                  <p className="text-sm font-semibold text-heading">{selectedUser.agency_name}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-xs text-text-tertiary">Joined</p>
                  <p className="text-sm font-semibold text-heading">{selectedUser.created_at}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-xs text-text-tertiary">Wallet Balance</p>
                  <p className="text-sm font-semibold text-heading">{"\u20B9"}{selectedUser.wallet_balance.toLocaleString('en-IN')}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-xs text-text-tertiary">Reward Points</p>
                  <p className="text-sm font-semibold text-heading">{selectedUser.reward_points.toLocaleString()}</p>
                </div>
              </div>

              {/* Wallet adjustment */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl mb-3">
                <p className="text-xs font-semibold text-blue-600 mb-2 flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5" /> Adjust Wallet Balance
                </p>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={walletAmount}
                    onChange={(e) => setWalletAmount(e.target.value)}
                    placeholder="Amount (+/-)"
                    className="flex-1 px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                  />
                  <button
                    onClick={() => handleWalletUpdate(selectedUser.id)}
                    className="px-4 py-2 gradient-bg text-white text-xs font-bold rounded-lg shadow-glow"
                  >
                    Update
                  </button>
                </div>
              </div>

              {/* Status actions */}
              <div className="flex gap-2">
                {selectedUser.account_status === 'active' ? (
                  <button onClick={() => { handleStatusChange(selectedUser.id, 'suspended'); setSelectedUser(null) }} className="flex-1 py-2.5 bg-red-50 border border-red-200 text-red-600 text-xs font-bold rounded-xl hover:bg-red-100">
                    Suspend User
                  </button>
                ) : (
                  <button onClick={() => { handleStatusChange(selectedUser.id, 'active'); setSelectedUser(null) }} className="flex-1 py-2.5 bg-green-50 border border-green-200 text-green-600 text-xs font-bold rounded-xl hover:bg-green-100">
                    Activate User
                  </button>
                )}
                {selectedUser.kyc_status === 'pending' && (
                  <button onClick={() => { handleKycChange(selectedUser.id, 'verified'); setSelectedUser(null) }} className="flex-1 py-2.5 bg-green-50 border border-green-200 text-green-600 text-xs font-bold rounded-xl hover:bg-green-100">
                    Approve KYC
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
