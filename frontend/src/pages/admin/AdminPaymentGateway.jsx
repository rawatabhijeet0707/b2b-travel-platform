import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, CreditCard, DollarSign, CheckCircle2, ToggleLeft, ToggleRight, Plus, Trash2, Banknote, Wallet, Landmark } from 'lucide-react'

export default function AdminPaymentGateway() {
  const [config, setConfig] = useState({
    defaultCurrency: 'INR',
    currencySymbol: '₹',
    settlementPeriod: 'T+2',
    minPayout: 1000,
    maxPayout: 500000,
    transactionFee: 2.5,
    internationalFee: 3.5,
  })

  const [toggles, setToggles] = useState({
    razorpay: true,
    stripe: true,
    paypal: false,
    payu: true,
    phonepe: true,
    gpay: true,
    bankTransfer: true,
    autoCapture: true,
    partialRefund: true,
  })

  const toggle = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }))
  const update = (key, value) => setConfig(prev => ({ ...prev, [key]: value }))

  const gateways = [
    { key: 'razorpay', name: 'Razorpay', desc: 'Indian payment gateway', icon: Wallet, color: 'text-blue-600 bg-blue-50', transactions: 8420, volume: 12450000 },
    { key: 'stripe', name: 'Stripe', desc: 'Global payment gateway', icon: CreditCard, color: 'text-violet-600 bg-violet-50', transactions: 3210, volume: 8900000 },
    { key: 'paypal', name: 'PayPal', desc: 'International payments', icon: DollarSign, color: 'text-blue-500 bg-blue-50', transactions: 0, volume: 0 },
    { key: 'payu', name: 'PayU', desc: 'Indian payment gateway', icon: Wallet, color: 'text-emerald-600 bg-emerald-50', transactions: 2187, volume: 4200000 },
    { key: 'phonepe', name: 'PhonePe', desc: 'UPI payments', icon: Banknote, color: 'text-purple-600 bg-purple-50', transactions: 1654, volume: 2890000 },
    { key: 'gpay', name: 'Google Pay', desc: 'UPI payments', icon: Banknote, color: 'text-green-600 bg-green-50', transactions: 1432, volume: 2540000 },
    { key: 'bankTransfer', name: 'Bank Transfer (NEFT/RTGS)', desc: 'Direct bank transfers', icon: Landmark, color: 'text-amber-600 bg-amber-50', transactions: 287, volume: 1850000 },
  ]

  const totalVolume = gateways.reduce((s, g) => s + g.volume, 0)
  const totalTxns = gateways.reduce((s, g) => s + g.transactions, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-heading">Payment Gateway</h1>
          <p className="text-sm text-text-secondary mt-0.5">Configure payment gateways and transaction settings</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 gradient-bg text-white text-sm font-semibold rounded-xl shadow-glow">
          <Save className="w-4 h-4" /> Save Settings
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Gateways', value: Object.values(toggles).filter(Boolean).length, icon: CreditCard, color: 'text-blue-600 bg-blue-50' },
          { label: 'Total Transactions', value: totalTxns.toLocaleString('en-IN'), icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Total Volume', value: `₹${(totalVolume / 100000).toFixed(1)}L`, icon: DollarSign, color: 'text-violet-600 bg-violet-50' },
          { label: 'Avg. Transaction', value: `₹${Math.round(totalVolume / totalTxns).toLocaleString('en-IN')}`, icon: Banknote, color: 'text-amber-600 bg-amber-50' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><s.icon className="w-5 h-5" /></div>
            <p className="text-sm text-text-secondary font-medium">{s.label}</p>
            <p className="text-2xl font-extrabold text-heading mt-1">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gateway List */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-primary" /><h3 className="text-lg font-bold text-heading">Payment Gateways</h3></div>
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary bg-primary/10 rounded-lg hover:bg-primary/20"><Plus className="w-3.5 h-3.5" /> Add Gateway</button>
          </div>
          <div className="space-y-3">
            {gateways.map(g => (
              <div key={g.key} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${g.color}`}><g.icon className="w-4.5 h-4.5" /></div>
                  <div>
                    <p className="text-sm font-semibold text-heading">{g.name}</p>
                    <p className="text-xs text-text-tertiary">{g.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {toggles[g.key] && (
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-semibold text-heading tabular-nums">{g.transactions.toLocaleString('en-IN')} txns</p>
                      <p className="text-xs text-text-tertiary">₹{(g.volume / 100000).toFixed(1)}L volume</p>
                    </div>
                  )}
                  <button onClick={() => toggle(g.key)}>{toggles[g.key] ? <ToggleRight className="w-8 h-8 text-primary" /> : <ToggleLeft className="w-8 h-8 text-slate-300" />}</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction Settings */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5"><DollarSign className="w-5 h-5 text-primary" /><h3 className="text-lg font-bold text-heading">Transaction Settings</h3></div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-heading mb-1.5 block">Default Currency</label>
                  <select value={config.defaultCurrency} onChange={(e) => update('defaultCurrency', e.target.value)} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="AED">AED (د.إ)</option>
                    <option value="SGD">SGD (S$)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-heading mb-1.5 block">Settlement Period</label>
                  <select value={config.settlementPeriod} onChange={(e) => update('settlementPeriod', e.target.value)} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
                    <option value="T+1">T+1 (Next day)</option>
                    <option value="T+2">T+2 (2 days)</option>
                    <option value="T+3">T+3 (3 days)</option>
                    <option value="T+7">T+7 (Weekly)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-heading mb-1.5 block">Domestic Transaction Fee (%)</label>
                <input type="number" step="0.1" value={config.transactionFee} onChange={(e) => update('transactionFee', parseFloat(e.target.value))} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-sm font-medium text-heading mb-1.5 block">International Transaction Fee (%)</label>
                <input type="number" step="0.1" value={config.internationalFee} onChange={(e) => update('internationalFee', parseFloat(e.target.value))} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-heading mb-1.5 block">Min Payout (₹)</label>
                  <input type="number" value={config.minPayout} onChange={(e) => update('minPayout', parseInt(e.target.value))} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-sm font-medium text-heading mb-1.5 block">Max Payout (₹)</label>
                  <input type="number" value={config.maxPayout} onChange={(e) => update('maxPayout', parseInt(e.target.value))} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-heading mb-5">Payment Options</h3>
            <div className="space-y-3">
              {[
                { key: 'autoCapture', label: 'Auto-Capture Payments', desc: 'Automatically capture authorized payments' },
                { key: 'partialRefund', label: 'Partial Refunds', desc: 'Allow partial refund processing' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div><p className="text-sm font-semibold text-heading">{item.label}</p><p className="text-xs text-text-tertiary">{item.desc}</p></div>
                  <button onClick={() => toggle(item.key)}>{toggles[item.key] ? <ToggleRight className="w-8 h-8 text-primary" /> : <ToggleLeft className="w-8 h-8 text-slate-300" />}</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
