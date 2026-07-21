import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Settings, Save, Mail, CreditCard, Globe, MessageSquare, Server } from 'lucide-react'
import { adminService } from '../../services/adminService.js'

const tabs = [
  { id: 'general', label: 'General', icon: Settings },
  { id: 'email', label: 'SMTP', icon: Mail },
  { id: 'payment', label: 'Payment Gateway', icon: CreditCard },
  { id: 'sms', label: 'SMS & WhatsApp', icon: MessageSquare },
  { id: 'integrations', label: 'Integrations', icon: Globe },
  { id: 'system', label: 'System', icon: Server },
]

export default function AdminSettings() {
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('general')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    adminService.getSettings().then(res => { setSettings(res.data || {}); setLoading(false) })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await adminService.updateSettings(settings)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (e) { console.error(e) }
    setSaving(false)
  }

  const update = (key, value) => setSettings({ ...settings, [key]: value })

  const fields = {
    general: [
      { key: 'site_name', label: 'Website Name', type: 'text' },
      { key: 'site_tagline', label: 'Tagline', type: 'text' },
      { key: 'currency', label: 'Currency', type: 'text' },
      { key: 'currency_symbol', label: 'Currency Symbol', type: 'text' },
      { key: 'timezone', label: 'Timezone', type: 'text' },
      { key: 'language', label: 'Language', type: 'text' },
    ],
    email: [
      { key: 'smtp_host', label: 'SMTP Host', type: 'text' },
      { key: 'smtp_port', label: 'SMTP Port', type: 'text' },
      { key: 'smtp_user', label: 'SMTP Username', type: 'text' },
      { key: 'smtp_pass', label: 'SMTP Password', type: 'password' },
    ],
    payment: [
      { key: 'razorpay_key_id', label: 'Razorpay Key ID', type: 'text' },
      { key: 'razorpay_key_secret', label: 'Razorpay Key Secret', type: 'password' },
      { key: 'stripe_secret_key', label: 'Stripe Secret Key', type: 'password' },
      { key: 'stripe_publishable_key', label: 'Stripe Publishable Key', type: 'text' },
    ],
    sms: [
      { key: 'sms_provider', label: 'SMS Provider', type: 'text' },
      { key: 'sms_api_key', label: 'SMS API Key', type: 'password' },
      { key: 'whatsapp_api_key', label: 'WhatsApp API Key', type: 'password' },
    ],
    integrations: [
      { key: 'google_maps_key', label: 'Google Maps API Key', type: 'text' },
      { key: 'google_analytics_id', label: 'Google Analytics ID', type: 'text' },
      { key: 'firebase_server_key', label: 'Firebase Server Key', type: 'password' },
    ],
    system: [
      { key: 'maintenance_mode', label: 'Maintenance Mode', type: 'boolean' },
    ],
  }

  if (loading) return <div className="flex items-center justify-center h-96"><div className="w-10 h-10 border-3 border-slate-200 border-t-[#2563EB] rounded-full animate-spin" /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-heading">Settings</h1>
          <p className="text-sm text-text-secondary mt-0.5">Configure your platform</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 gradient-bg text-white text-xs font-bold rounded-xl shadow-glow disabled:opacity-60">
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </motion.button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Tabs */}
        <div className="lg:w-56 shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200 p-2 flex lg:flex-col gap-1 overflow-x-auto">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeTab === t.id ? 'gradient-bg text-white shadow-glow' : 'text-text-secondary hover:bg-slate-50'}`}
              >
                <t.icon className="w-4 h-4 shrink-0" /> {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(fields[activeTab] || []).map(f => (
              <div key={f.key} className={f.type === 'boolean' ? 'col-span-2' : ''}>
                <label className="text-xs font-semibold text-text-secondary mb-1.5 block">{f.label}</label>
                {f.type === 'boolean' ? (
                  <button
                    onClick={() => update(f.key, settings[f.key] === 'true' ? 'false' : 'true')}
                    className={`relative w-14 h-7 rounded-full transition-all ${settings[f.key] === 'true' ? 'gradient-bg' : 'bg-slate-200'}`}
                  >
                    <motion.div animate={{ x: settings[f.key] === 'true' ? 28 : 2 }} className="absolute top-1 w-5 h-5 rounded-full bg-white shadow" />
                  </button>
                ) : (
                  <input
                    type={f.type === 'password' ? 'password' : 'text'}
                    value={settings[f.key] || ''}
                    onChange={(e) => update(f.key, e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-heading focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
