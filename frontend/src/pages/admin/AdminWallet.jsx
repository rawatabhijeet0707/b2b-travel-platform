import { motion } from 'framer-motion'
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Users } from 'lucide-react'

const dummyWallets = [
  { id: 1, user: 'Rahul Sharma', agency: 'SkyHigh Travels', email: 'rahul@skyhigh.com', balance: 248500, creditLimit: 50000, creditUsed: 15000, transactions: 142, status: 'active' },
  { id: 2, user: 'Priya Patel', agency: 'Wanderlust Tours', email: 'priya@wanderlust.com', balance: 156000, creditLimit: 50000, creditUsed: 0, transactions: 89, status: 'active' },
  { id: 3, user: 'Amit Kumar', agency: 'Globe Trotter', email: 'amit@globetrotter.com', balance: 52000, creditLimit: 30000, creditUsed: 28000, transactions: 34, status: 'active' },
  { id: 4, user: 'Sneha Reddy', agency: 'Travel XP', email: 'sneha@travelxp.com', balance: 89000, creditLimit: 50000, creditUsed: 12000, transactions: 67, status: 'suspended' },
  { id: 5, user: 'Vikram Singh', agency: 'Happy Holidays', email: 'vikram@holidays.com', balance: 312000, creditLimit: 100000, creditUsed: 45000, transactions: 198, status: 'active' },
  { id: 6, user: 'Neha Gupta', agency: 'Fly High Travels', email: 'neha@flyhigh.com', balance: 18500, creditLimit: 20000, creditUsed: 18500, transactions: 23, status: 'active' },
  { id: 7, user: 'Rajesh Kumar', agency: 'World Tours', email: 'rajesh@worldtours.com', balance: 425000, creditLimit: 100000, creditUsed: 30000, transactions: 256, status: 'active' },
  { id: 8, user: 'Anita Desai', agency: 'Premium Travels', email: 'anita@premiumtravels.com', balance: 67000, creditLimit: 50000, creditUsed: 8000, transactions: 45, status: 'active' },
]

export default function AdminWallet() {
  const totalBalance = dummyWallets.reduce((s, w) => s + w.balance, 0)
  const totalCredit = dummyWallets.reduce((s, w) => s + w.creditLimit, 0)
  const totalCreditUsed = dummyWallets.reduce((s, w) => s + w.creditUsed, 0)
  const totalTxns = dummyWallets.reduce((s, w) => s + w.transactions, 0)

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-extrabold text-heading">Wallet Management</h1><p className="text-sm text-text-secondary mt-0.5">Monitor user wallets and credit limits</p></div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Wallet Balance', value: `\u20B9${(totalBalance / 100000).toFixed(1)}L`, icon: Wallet, color: 'from-green-500 to-green-600', trend: '+12%' },
          { label: 'Total Credit Issued', value: `\u20B9${(totalCredit / 100000).toFixed(1)}L`, icon: TrendingUp, color: 'from-blue-500 to-blue-600', trend: '+5%' },
          { label: 'Credit Used', value: `\u20B9${(totalCreditUsed / 100000).toFixed(1)}L`, icon: TrendingDown, color: 'from-amber-500 to-orange-500', trend: '+18%' },
          { label: 'Total Transactions', value: totalTxns.toLocaleString(), icon: Users, color: 'from-purple-500 to-purple-600', trend: '+8%' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-start justify-between mb-2"><div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}><s.icon className="w-4.5 h-4.5 text-white" /></div><span className="text-xs font-bold text-green-600 flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3" />{s.trend}</span></div>
            <p className="text-xs text-text-tertiary font-medium">{s.label}</p><p className="text-lg font-extrabold text-heading">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full">
          <thead><tr className="border-b border-slate-200 bg-slate-50">
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">User</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3 hidden sm:table-cell">Agency</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">Balance</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3 hidden md:table-cell">Credit Limit</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3 hidden lg:table-cell">Credit Used</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3 hidden lg:table-cell">Transactions</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">Status</th>
          </tr></thead>
          <tbody>
            {dummyWallets.map((w, i) => (
              <motion.tr key={w.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3"><div className="flex items-center gap-2.5"><div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white text-xs font-bold">{w.user.charAt(0)}</div><div><p className="text-sm font-semibold text-heading">{w.user}</p><p className="text-xs text-text-tertiary">{w.email}</p></div></div></td>
                <td className="px-4 py-3 hidden sm:table-cell text-sm text-text-secondary">{w.agency}</td>
                <td className="px-4 py-3"><p className="text-sm font-bold text-heading">{"\u20B9"}{w.balance.toLocaleString('en-IN')}</p></td>
                <td className="px-4 py-3 hidden md:table-cell text-sm text-text-secondary">{"\u20B9"}{w.creditLimit.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3 hidden lg:table-cell"><div className="flex items-center gap-2"><span className="text-sm font-semibold text-heading">{"\u20B9"}{w.creditUsed.toLocaleString('en-IN')}</span><div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full rounded-full bg-amber-500" style={{ width: `${(w.creditUsed / w.creditLimit) * 100}%` }} /></div></div></td>
                <td className="px-4 py-3 hidden lg:table-cell text-sm text-text-secondary">{w.transactions}</td>
                <td className="px-4 py-3"><span className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full border ${w.status === 'active' ? 'text-green-600 bg-green-50 border-green-200' : 'text-red-600 bg-red-50 border-red-200'}`}>{w.status}</span></td>
              </motion.tr>
            ))}
          </tbody>
        </table></div>
      </div>
    </div>
  )
}
