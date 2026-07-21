import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Key, Webhook, Plug, Plus, Trash2, Copy, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react'

const dummyApis = [
  { id: 'API-001', name: 'Amadeus Flight API', provider: 'Amadeus', status: 'active', key: 'ama_prod_••••••••••••8f2a', endpoint: 'https://api.amadeus.com/v2', requests: 124850, lastUsed: '2 min ago' },
  { id: 'API-002', name: 'Sabre GDS', provider: 'Sabre', status: 'active', key: 'sabre_prod_••••••••••••3c1d', endpoint: 'https://api.sabre.com/v1', requests: 98420, lastUsed: '5 min ago' },
  { id: 'API-003', name: 'HotelBeds API', provider: 'HotelBeds', status: 'active', key: 'hb_prod_••••••••••••e9b4', endpoint: 'https://api.hotelbeds.com/v1', requests: 76340, lastUsed: '1 min ago' },
  { id: 'API-004', name: 'Booking.com Affiliate', provider: 'Booking.com', status: 'active', key: 'bcom_••••••••••••a7f3', endpoint: 'https://api.booking.com/2.0', requests: 45210, lastUsed: '10 min ago' },
  { id: 'API-005', name: 'VisaPro API', provider: 'VisaPro', status: 'inactive', key: 'visapro_••••••••••••2d8e', endpoint: 'https://api.visapro.net/v1', requests: 8920, lastUsed: '3 days ago' },
  { id: 'API-006', name: 'Insurance Gateway', provider: 'AXA Travel', status: 'active', key: 'axa_••••••••••••f4c1', endpoint: 'https://api.axa-travel.com/v2', requests: 12450, lastUsed: '1 hour ago' },
]

const webhooks = [
  { id: 'WH-001', event: 'booking.created', url: 'https://api.travelhub.com/webhooks/booking', status: 'active', deliveries: 12480, failures: 12 },
  { id: 'WH-002', event: 'payment.success', url: 'https://api.travelhub.com/webhooks/payment', status: 'active', deliveries: 8920, failures: 3 },
  { id: 'WH-003', event: 'user.registered', url: 'https://api.travelhub.com/webhooks/user', status: 'active', deliveries: 312, failures: 0 },
  { id: 'WH-004', event: 'kyc.submitted', url: 'https://api.travelhub.com/webhooks/kyc', status: 'active', deliveries: 86, failures: 1 },
  { id: 'WH-005', event: 'ticket.created', url: 'https://api.travelhub.com/webhooks/ticket', status: 'inactive', deliveries: 142, failures: 8 },
]

export default function AdminApiConfig() {
  const [showKey, setShowKey] = useState({})
  const [tab, setTab] = useState('keys')

  const toggleKey = (id) => setShowKey(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-heading">API Configuration</h1>
          <p className="text-sm text-text-secondary mt-0.5">Manage API keys and third-party integrations</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 gradient-bg text-white text-sm font-semibold rounded-xl shadow-glow">
          <Plus className="w-4 h-4" /> Add API Key
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total APIs', value: dummyApis.length, icon: Plug, color: 'text-blue-600 bg-blue-50' },
          { label: 'Active', value: dummyApis.filter(a => a.status === 'active').length, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Total Requests', value: dummyApis.reduce((s, a) => s + a.requests, 0).toLocaleString('en-IN'), icon: Webhook, color: 'text-violet-600 bg-violet-50' },
          { label: 'Webhooks', value: webhooks.filter(w => w.status === 'active').length, icon: Webhook, color: 'text-amber-600 bg-amber-50' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><s.icon className="w-5 h-5" /></div>
            <p className="text-sm text-text-secondary font-medium">{s.label}</p>
            <p className="text-2xl font-extrabold text-heading mt-1">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {['keys', 'webhooks'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all capitalize ${tab === t ? 'gradient-bg text-white shadow-glow' : 'bg-white border border-slate-200 text-text-secondary hover:text-heading'}`}>
            {t === 'keys' ? 'API Keys' : 'Webhooks'}
          </button>
        ))}
      </div>

      {tab === 'keys' ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">API Name</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Provider</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden md:table-cell">API Key</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Requests</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-right text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Actions</th>
              </tr></thead>
              <tbody>
                {dummyApis.map((api, i) => (
                  <motion.tr key={api.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-heading">{api.name}</p>
                      <p className="text-xs text-text-tertiary">{api.id} · {api.lastUsed}</p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell"><p className="text-sm text-text-secondary">{api.provider}</p></td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <code className="text-xs text-text-secondary font-mono bg-slate-100 px-2 py-1 rounded">{showKey[api.id] ? api.key.replace(/•/g, 'x') : api.key}</code>
                        <button onClick={() => toggleKey(api.id)} className="text-text-tertiary hover:text-heading">{showKey[api.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}</button>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell"><p className="text-sm font-semibold text-heading tabular-nums">{api.requests.toLocaleString('en-IN')}</p></td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${api.status === 'active' ? 'text-green-600 bg-green-50 border-green-200' : 'text-slate-600 bg-slate-100 border-slate-200'}`}>{api.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-text-secondary hover:text-primary" title="Copy Key"><Copy className="w-3.5 h-3.5" /></button>
                        <button className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-text-secondary hover:text-red-500" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Event</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden sm:table-cell">URL</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden md:table-cell">Deliveries</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Failures</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-right text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Actions</th>
              </tr></thead>
              <tbody>
                {webhooks.map((w, i) => (
                  <motion.tr key={w.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3"><p className="text-sm font-semibold text-heading font-mono">{w.event}</p><p className="text-xs text-text-tertiary">{w.id}</p></td>
                    <td className="px-4 py-3 hidden sm:table-cell"><code className="text-xs text-text-secondary font-mono truncate block max-w-xs">{w.url}</code></td>
                    <td className="px-4 py-3 hidden md:table-cell"><p className="text-sm font-semibold text-heading tabular-nums">{w.deliveries.toLocaleString('en-IN')}</p></td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className={`text-sm font-semibold ${w.failures > 5 ? 'text-red-500' : w.failures > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>{w.failures}</span>
                    </td>
                    <td className="px-4 py-3"><span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${w.status === 'active' ? 'text-green-600 bg-green-50 border-green-200' : 'text-slate-600 bg-slate-100 border-slate-200'}`}>{w.status}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-text-secondary hover:text-primary" title="Edit"><Key className="w-3.5 h-3.5" /></button>
                        <button className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-text-secondary hover:text-red-500" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
