import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Eye, X, Plane, TrendingUp, Wallet, Award, MapPin,
  CheckCircle2, Clock, Ban, Building2, Star, Phone, Mail, Calendar
} from 'lucide-react'

const dummyAgents = [
  {
    id: 'AGT-001', name: 'Rajesh Kumar', email: 'rajesh@skyhightravels.com', mobile: '+91 98765 43210',
    agency: 'SkyHigh Travels', city: 'New Delhi', country: 'India',
    wallet: 248500, points: 45200, bookings: 1248, commission: 187000,
    rating: 4.8, status: 'active', kyc: 'verified', joined: 'Jan 2024',
  },
  {
    id: 'AGT-002', name: 'Priya Sharma', email: 'priya@wanderlusttours.in', mobile: '+91 99876 54321',
    agency: 'Wanderlust Tours', city: 'Mumbai', country: 'India',
    wallet: 185200, points: 38100, bookings: 982, commission: 142500,
    rating: 4.6, status: 'active', kyc: 'verified', joined: 'Feb 2024',
  },
  {
    id: 'AGT-003', name: 'Mohammed Ali', email: 'ali@globalvoyage.ae', mobile: '+971 50 123 4567',
    agency: 'Global Voyage LLC', city: 'Dubai', country: 'UAE',
    wallet: 320000, points: 62500, bookings: 1856, commission: 285000,
    rating: 4.9, status: 'active', kyc: 'verified', joined: 'Dec 2023',
  },
  {
    id: 'AGT-004', name: 'Anita Desai', email: 'anita@horizonholidays.com', mobile: '+91 90123 45678',
    agency: 'Horizon Holidays', city: 'Bangalore', country: 'India',
    wallet: 92500, points: 12800, bookings: 432, commission: 68000,
    rating: 4.3, status: 'active', kyc: 'pending', joined: 'Mar 2024',
  },
  {
    id: 'AGT-005', name: 'Vikram Singh', email: 'vikram@royaljourneys.com', mobile: '+91 98111 22233',
    agency: 'Royal Journeys', city: 'Jaipur', country: 'India',
    wallet: 156000, points: 24500, bookings: 768, commission: 112000,
    rating: 4.5, status: 'suspended', kyc: 'verified', joined: 'Jan 2024',
  },
  {
    id: 'AGT-006', name: 'Sneha Reddy', email: 'sneha@flyhighsolutions.in', mobile: '+91 97000 55667',
    agency: 'FlyHigh Solutions', city: 'Hyderabad', country: 'India',
    wallet: 210500, points: 31200, bookings: 1056, commission: 168000,
    rating: 4.7, status: 'active', kyc: 'verified', joined: 'Nov 2023',
  },
  {
    id: 'AGT-007', name: 'Arjun Mehta', email: 'arjun@travelcraft.co', mobile: '+91 98300 11234',
    agency: 'TravelCraft', city: 'Pune', country: 'India',
    wallet: 67800, points: 8900, bookings: 287, commission: 42000,
    rating: 4.1, status: 'active', kyc: 'pending', joined: 'Apr 2024',
  },
  {
    id: 'AGT-008', name: 'Kavya Nair', email: 'kavya@globetrotterhub.com', mobile: '+91 97455 66778',
    agency: 'Globe Trotter Hub', city: 'Kochi', country: 'India',
    wallet: 289000, points: 51800, bookings: 1432, commission: 215000,
    rating: 4.8, status: 'active', kyc: 'verified', joined: 'Oct 2023',
  },
  {
    id: 'AGT-009', name: 'Daniel Park', email: 'daniel@asiapacifictravel.sg', mobile: '+65 8123 4567',
    agency: 'Asia Pacific Travel', city: 'Singapore', country: 'Singapore',
    wallet: 415000, points: 78500, bookings: 2104, commission: 342000,
    rating: 4.9, status: 'active', kyc: 'verified', joined: 'Sep 2023',
  },
  {
    id: 'AGT-010', name: 'Fatima Khan', email: 'fatima@elegantescapes.pk', mobile: '+92 300 1234567',
    agency: 'Elegant Escapes', city: 'Karachi', country: 'Pakistan',
    wallet: 54200, points: 6700, bookings: 198, commission: 28500,
    rating: 3.9, status: 'suspended', kyc: 'rejected', joined: 'May 2024',
  },
  {
    id: 'AGT-011', name: 'Rohit Gupta', email: 'rohit@discoverindia.co', mobile: '+91 98998 88776',
    agency: 'Discover India', city: 'Lucknow', country: 'India',
    wallet: 134000, points: 19300, bookings: 645, commission: 92000,
    rating: 4.4, status: 'active', kyc: 'verified', joined: 'Feb 2024',
  },
  {
    id: 'AGT-012', name: 'Lisa Chen', email: 'lisa@chinatravelsolutions.cn', mobile: '+86 138 1234 5678',
    agency: 'China Travel Solutions', city: 'Shanghai', country: 'China',
    wallet: 378000, points: 65400, bookings: 1722, commission: 268000,
    rating: 4.7, status: 'active', kyc: 'verified', joined: 'Aug 2023',
  },
]

const formatAmount = (amt) => `₹${amt.toLocaleString('en-IN')}`

export default function AdminAgents() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [kycFilter, setKycFilter] = useState('')
  const [selectedAgent, setSelectedAgent] = useState(null)

  const filtered = dummyAgents.filter(a => {
    if (search) {
      const q = search.toLowerCase()
      if (!a.name.toLowerCase().includes(q) && !a.email.toLowerCase().includes(q) && !a.agency.toLowerCase().includes(q)) return false
    }
    if (statusFilter && a.status !== statusFilter) return false
    if (kycFilter && a.kyc !== kycFilter) return false
    return true
  })

  const totalBookings = dummyAgents.reduce((s, a) => s + a.bookings, 0)
  const totalCommission = dummyAgents.reduce((s, a) => s + a.commission, 0)
  const totalWallet = dummyAgents.reduce((s, a) => s + a.wallet, 0)
  const activeCount = dummyAgents.filter(a => a.status === 'active').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-heading">Agent Management</h1>
        <p className="text-sm text-text-secondary mt-0.5">Manage all travel agents and their performance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Agents', value: dummyAgents.length, icon: Building2, color: 'text-blue-600 bg-blue-50' },
          { label: 'Active Agents', value: activeCount, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Total Bookings', value: totalBookings.toLocaleString('en-IN'), icon: Plane, color: 'text-violet-600 bg-violet-50' },
          { label: 'Total Commission', value: formatAmount(totalCommission), icon: TrendingUp, color: 'text-amber-600 bg-amber-50' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <p className="text-sm text-text-secondary font-medium">{s.label}</p>
            <p className="text-2xl font-extrabold text-heading mt-1 tabular-nums">{s.value}</p>
          </motion.div>
        ))}
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
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Agent</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Agency</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden md:table-cell">Bookings</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Commission</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Rating</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">KYC</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-right text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="8" className="text-center py-12 text-text-tertiary text-sm">No agents found</td></tr>
              ) : filtered.map((agent, i) => (
                <motion.tr
                  key={agent.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {agent.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-heading truncate">{agent.name}</p>
                        <p className="text-xs text-text-tertiary truncate">{agent.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <p className="text-sm text-text-secondary">{agent.agency}</p>
                    <p className="text-xs text-text-tertiary">{agent.city}, {agent.country}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <p className="text-sm font-semibold text-heading tabular-nums">{agent.bookings.toLocaleString('en-IN')}</p>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <p className="text-sm font-semibold text-heading tabular-nums">{formatAmount(agent.commission)}</p>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-semibold text-heading">{agent.rating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                      agent.kyc === 'verified' ? 'text-green-600 bg-green-50 border border-green-200' :
                      agent.kyc === 'pending' ? 'text-amber-600 bg-amber-50 border border-amber-200' :
                      'text-red-600 bg-red-50 border border-red-200'
                    }`}>
                      {agent.kyc === 'verified' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {agent.kyc}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                      agent.status === 'active' ? 'text-green-600 bg-green-50 border border-green-200' :
                      'text-red-600 bg-red-50 border border-red-200'
                    }`}>
                      {agent.status === 'active' ? <CheckCircle2 className="w-3 h-3" /> : <Ban className="w-3 h-3" />}
                      {agent.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setSelectedAgent(agent)} className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-text-secondary hover:text-primary" title="View Details">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-sm text-text-tertiary">Showing {filtered.length} of {dummyAgents.length} agents</p>
        </div>
      </div>

      {/* Agent Detail Modal */}
      <AnimatePresence>
        {selectedAgent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAgent(null)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-heading">Agent Details</h3>
                <button onClick={() => setSelectedAgent(null)} className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center">
                  <X className="w-4 h-4 text-text-secondary" />
                </button>
              </div>

              {/* Profile header */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center text-white text-2xl font-bold shrink-0">
                  {selectedAgent.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-bold text-heading">{selectedAgent.name}</p>
                  <p className="text-sm text-text-secondary">{selectedAgent.agency}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-semibold text-heading">{selectedAgent.rating}</span>
                    <span className="text-xs text-text-tertiary">· {selectedAgent.id}</span>
                  </div>
                </div>
              </div>

              {/* Contact info */}
              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-text-tertiary shrink-0" />
                  <span className="text-text-secondary">{selectedAgent.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-text-tertiary shrink-0" />
                  <span className="text-text-secondary">{selectedAgent.mobile}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-text-tertiary shrink-0" />
                  <span className="text-text-secondary">{selectedAgent.city}, {selectedAgent.country}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-text-tertiary shrink-0" />
                  <span className="text-text-secondary">Joined {selectedAgent.joined}</span>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Wallet className="w-3.5 h-3.5 text-blue-600" />
                    <p className="text-xs text-blue-600 font-medium">Wallet Balance</p>
                  </div>
                  <p className="text-sm font-bold text-heading">{formatAmount(selectedAgent.wallet)}</p>
                </div>
                <div className="p-3 bg-violet-50 rounded-xl border border-violet-100">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Award className="w-3.5 h-3.5 text-violet-600" />
                    <p className="text-xs text-violet-600 font-medium">Reward Points</p>
                  </div>
                  <p className="text-sm font-bold text-heading">{selectedAgent.points.toLocaleString('en-IN')}</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Plane className="w-3.5 h-3.5 text-emerald-600" />
                    <p className="text-xs text-emerald-600 font-medium">Total Bookings</p>
                  </div>
                  <p className="text-sm font-bold text-heading">{selectedAgent.bookings.toLocaleString('en-IN')}</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                  <div className="flex items-center gap-1.5 mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                    <p className="text-xs text-amber-600 font-medium">Commission Earned</p>
                  </div>
                  <p className="text-sm font-bold text-heading">{formatAmount(selectedAgent.commission)}</p>
                </div>
              </div>

              {/* Status badges */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div>
                  <p className="text-xs text-text-tertiary mb-1">KYC Status</p>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                    selectedAgent.kyc === 'verified' ? 'text-green-600 bg-green-50 border border-green-200' :
                    selectedAgent.kyc === 'pending' ? 'text-amber-600 bg-amber-50 border border-amber-200' :
                    'text-red-600 bg-red-50 border border-red-200'
                  }`}>
                    {selectedAgent.kyc === 'verified' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {selectedAgent.kyc}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-text-tertiary mb-1">Account Status</p>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                    selectedAgent.status === 'active' ? 'text-green-600 bg-green-50 border border-green-200' :
                    'text-red-600 bg-red-50 border border-red-200'
                  }`}>
                    {selectedAgent.status === 'active' ? <CheckCircle2 className="w-3 h-3" /> : <Ban className="w-3 h-3" />}
                    {selectedAgent.status}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
