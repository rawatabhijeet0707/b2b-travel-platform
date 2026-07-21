import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Users, CheckCircle2, X, Plus, Lock, Unlock, Edit3 } from 'lucide-react'

const dummyRoles = [
  { id: 'ROL-001', name: 'Super Admin', description: 'Full access to all modules and settings', users: 2, permissions: 48, color: 'purple', status: 'active' },
  { id: 'ROL-002', name: 'Operations Manager', description: 'Manage bookings, agents, and operations', users: 4, permissions: 32, color: 'blue', status: 'active' },
  { id: 'ROL-003', name: 'Finance Officer', description: 'Handle payments, invoices, and wallet', users: 3, permissions: 24, color: 'emerald', status: 'active' },
  { id: 'ROL-004', name: 'Support Lead', description: 'Manage tickets, chatbot, and customer support', users: 5, permissions: 18, color: 'amber', status: 'active' },
  { id: 'ROL-005', name: 'Content Manager', description: 'Manage CMS, blogs, FAQ, and testimonials', users: 3, permissions: 16, color: 'pink', status: 'active' },
  { id: 'ROL-006', name: 'Sales Executive', description: 'View dashboard and manage promotions', users: 6, permissions: 12, color: 'cyan', status: 'active' },
  { id: 'ROL-007', name: 'IT Administrator', description: 'System config, API keys, and audit logs', users: 2, permissions: 40, color: 'indigo', status: 'active' },
  { id: 'ROL-008', name: 'Marketing Specialist', description: 'Manage newsletters, offers, and coupons', users: 4, permissions: 14, color: 'red', status: 'active' },
]

const permissionModules = [
  { module: 'Dashboard', permissions: ['View', 'Export'] },
  { module: 'User Management', permissions: ['View', 'Create', 'Edit', 'Delete', 'Suspend'] },
  { module: 'Bookings', permissions: ['View', 'Create', 'Edit', 'Cancel'] },
  { module: 'Wallet & Payments', permissions: ['View', 'Add Funds', 'Deduct', 'Export'] },
  { module: 'Reports & Analytics', permissions: ['View', 'Export'] },
  { module: 'CMS & Content', permissions: ['View', 'Create', 'Edit', 'Delete'] },
  { module: 'System Settings', permissions: ['View', 'Edit'] },
]

const colorMap = {
  purple: 'bg-purple-50 text-purple-600 border-purple-200',
  blue: 'bg-blue-50 text-blue-600 border-blue-200',
  emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  amber: 'bg-amber-50 text-amber-600 border-amber-200',
  pink: 'bg-pink-50 text-pink-600 border-pink-200',
  cyan: 'bg-cyan-50 text-cyan-600 border-cyan-200',
  indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
  red: 'bg-red-50 text-red-600 border-red-200',
}

export default function AdminRoles() {
  const [selectedRole, setSelectedRole] = useState(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-heading">Roles & Permissions</h1>
          <p className="text-sm text-text-secondary mt-0.5">Manage access levels and permissions</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 gradient-bg text-white text-sm font-semibold rounded-xl shadow-glow">
          <Plus className="w-4 h-4" /> Create Role
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Roles', value: dummyRoles.length, icon: Shield, color: 'text-violet-600 bg-violet-50' },
          { label: 'Total Users', value: dummyRoles.reduce((s, r) => s + r.users, 0), icon: Users, color: 'text-blue-600 bg-blue-50' },
          { label: 'Total Permissions', value: 48, icon: Lock, color: 'text-amber-600 bg-amber-50' },
          { label: 'Active Roles', value: dummyRoles.filter(r => r.status === 'active').length, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><s.icon className="w-5 h-5" /></div>
            <p className="text-sm text-text-secondary font-medium">{s.label}</p>
            <p className="text-2xl font-extrabold text-heading mt-1">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {dummyRoles.map((role, i) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorMap[role.color]}`}>
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-heading">{role.name}</p>
                  <p className="text-xs text-text-tertiary">{role.id}</p>
                </div>
              </div>
              <button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-text-secondary hover:text-primary">
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-sm text-text-secondary mb-4">{role.description}</p>
            <div className="flex items-center gap-4 text-xs">
              <span className="inline-flex items-center gap-1 text-text-secondary"><Users className="w-3.5 h-3.5" /> {role.users} users</span>
              <span className="inline-flex items-center gap-1 text-text-secondary"><Lock className="w-3.5 h-3.5" /> {role.permissions} permissions</span>
              <span className="inline-flex items-center gap-1 text-green-600 font-medium"><CheckCircle2 className="w-3.5 h-3.5" /> {role.status}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Permission Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-lg font-bold text-heading">Permission Matrix</h3>
          <p className="text-sm text-text-secondary mt-0.5">Module-level access control overview</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Module</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Permissions</th>
                <th className="text-right text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Count</th>
              </tr>
            </thead>
            <tbody>
              {permissionModules.map((m, i) => (
                <tr key={m.module} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-semibold text-heading">{m.module}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {m.permissions.map(p => (
                        <span key={p} className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full text-emerald-600 bg-emerald-50 border border-emerald-200">
                          <Unlock className="w-2.5 h-2.5" /> {p}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-bold text-heading">{m.permissions.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
