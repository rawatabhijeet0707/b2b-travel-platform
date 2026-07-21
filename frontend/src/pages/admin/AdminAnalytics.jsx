import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Users, Plane, Hotel, Package, Globe, Activity, Clock, Zap } from 'lucide-react'

const trafficData = [
  { hour: '00', users: 124, sessions: 189 },
  { hour: '02', users: 86, sessions: 132 },
  { hour: '04', users: 65, sessions: 98 },
  { hour: '06', users: 142, sessions: 215 },
  { hour: '08', users: 287, sessions: 412 },
  { hour: '10', users: 398, sessions: 567 },
  { hour: '12', users: 445, sessions: 632 },
  { hour: '14', users: 412, sessions: 589 },
  { hour: '16', users: 378, sessions: 534 },
  { hour: '18', users: 324, sessions: 467 },
  { hour: '20', users: 256, sessions: 378 },
  { hour: '22', users: 187, sessions: 276 },
]

const deviceData = [
  { device: 'Desktop', percent: 58, color: 'bg-blue-500', count: 1842 },
  { device: 'Mobile', percent: 35, color: 'bg-violet-500', count: 1112 },
  { device: 'Tablet', percent: 7, color: 'bg-emerald-500', count: 222 },
]

const geoData = [
  { country: 'India', flag: '🇮🇳', users: 2840, percent: 68 },
  { country: 'UAE', flag: '🇦🇪', users: 542, percent: 13 },
  { country: 'Singapore', flag: '🇸🇬', users: 312, percent: 7 },
  { country: 'China', flag: '🇨🇳', users: 198, percent: 5 },
  { country: 'Pakistan', flag: '🇵🇰', users: 124, percent: 3 },
  { country: 'Other', flag: '🌍', users: 160, percent: 4 },
]

const topPages = [
  { page: '/app', views: 8420, avgTime: '4m 32s', bounce: 22 },
  { page: '/app/bookings', views: 6234, avgTime: '3m 15s', bounce: 18 },
  { page: '/app/wallet', views: 4521, avgTime: '2m 48s', bounce: 15 },
  { page: '/app/reports', views: 3187, avgTime: '5m 12s', bounce: 28 },
  { page: '/app/profile', views: 2845, avgTime: '1m 56s', bounce: 35 },
  { page: '/app/support', views: 1987, avgTime: '6m 23s', bounce: 12 },
  { page: '/app/kyc', views: 1654, avgTime: '3m 45s', bounce: 20 },
  { page: '/app/invoices', views: 1432, avgTime: '2m 18s', bounce: 25 },
]

const maxUsers = Math.max(...trafficData.map(t => t.users))

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-heading">Analytics</h1>
        <p className="text-sm text-text-secondary mt-0.5">Platform usage analytics and user behavior insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Users', value: '4,176', change: '+12.3%', trend: 'up', icon: Users, color: 'text-blue-600 bg-blue-50' },
          { label: 'Sessions Today', value: '5,892', change: '+8.7%', trend: 'up', icon: Activity, color: 'text-violet-600 bg-violet-50' },
          { label: 'Avg. Session', value: '4m 18s', change: '+15.2%', trend: 'up', icon: Clock, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Bounce Rate', value: '21.8%', change: '-3.1%', trend: 'down', icon: TrendingDown, color: 'text-amber-600 bg-amber-50' },
        ].map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${m.color}`}><m.icon className="w-5 h-5" /></div>
              <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${m.trend === 'up' ? 'text-emerald-700 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
                {m.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{m.change}
              </span>
            </div>
            <p className="text-sm text-text-secondary font-medium">{m.label}</p>
            <p className="text-2xl font-extrabold text-heading mt-1">{m.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-heading mb-1">Hourly Traffic</h3>
          <p className="text-sm text-text-secondary mb-6">User activity throughout the day</p>
          <div className="flex items-end justify-between gap-2 h-48">
            {trafficData.map((t, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="relative w-full flex items-end justify-center h-full">
                  <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-heading bg-white px-2 py-1 rounded shadow-sm whitespace-nowrap z-10">{t.users} users</div>
                  <motion.div initial={{ height: 0 }} animate={{ height: `${(t.users / maxUsers) * 100}%` }} transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }} className="w-full max-w-[28px] bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer" />
                </div>
                <span className="text-xs text-text-secondary font-medium">{t.hour}:00</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Device Breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-heading mb-1">Device Breakdown</h3>
          <p className="text-sm text-text-secondary mb-6">Users by device type</p>
          <div className="space-y-4">
            {deviceData.map((d, i) => (
              <div key={d.device}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-heading">{d.device}</span>
                  <span className="text-sm font-bold text-heading tabular-nums">{d.count.toLocaleString('en-IN')}</span>
                </div>
                <div className="h-2.5 bg-slate-200/70 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${d.percent}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }} className={`h-full ${d.color} rounded-full`} />
                </div>
                <p className="text-xs text-text-tertiary mt-1">{d.percent}% of total</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100"><h3 className="text-lg font-bold text-heading">Top Pages</h3><p className="text-sm text-text-secondary mt-0.5">Most visited pages</p></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Page</th>
                <th className="text-right text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Views</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Avg. Time</th>
                <th className="text-right text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Bounce</th>
              </tr></thead>
              <tbody>
                {topPages.map(p => (
                  <tr key={p.page} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-semibold text-heading font-mono">{p.page}</td>
                    <td className="px-4 py-3 text-right text-sm font-bold text-heading tabular-nums">{p.views.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 hidden sm:table-cell text-sm text-text-secondary">{p.avgTime}</td>
                    <td className="px-4 py-3 text-right hidden sm:table-cell"><span className={`text-sm font-semibold ${p.bounce > 25 ? 'text-amber-600' : 'text-emerald-600'}`}>{p.bounce}%</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Geographic Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5"><Globe className="w-5 h-5 text-primary" /><h3 className="text-lg font-bold text-heading">Geographic Distribution</h3></div>
          <div className="space-y-4">
            {geoData.map((g, i) => (
              <div key={g.country} className="flex items-center gap-3">
                <span className="text-2xl">{g.flag}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-heading">{g.country}</span>
                    <span className="text-sm font-bold text-heading tabular-nums">{g.users.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="h-2 bg-slate-200/70 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${g.percent}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }} className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                  </div>
                </div>
                <span className="text-xs font-semibold text-text-tertiary w-10 text-right">{g.percent}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
