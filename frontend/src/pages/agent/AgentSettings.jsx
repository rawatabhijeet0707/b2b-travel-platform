import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Settings, Loader2, Bell, Globe, Shield } from 'lucide-react'
import { agentService } from '../../services/agentService.js'

export default function AgentSettings() {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    agentService.getSettings()
      .then(setSettings)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleToggle = (category, key) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key],
      },
    }))
  }

  const handleSave = () => {
    setSaving(true)
    agentService.updateSettings(settings)
      .finally(() => setSaving(false))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-heading">Settings</h1>
        <p className="text-sm text-text-secondary mt-0.5">Manage your account preferences and security</p>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <Bell className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-bold text-heading">Notification Preferences</h3>
        </div>
        <div className="space-y-4">
          {[
            { key: 'email_alerts', label: 'Email Alerts', desc: 'Receive important alerts via email' },
            { key: 'sms_alerts', label: 'SMS Alerts', desc: 'Get critical alerts via SMS' },
            { key: 'booking_confirmations', label: 'Booking Confirmations', desc: 'Notifications for every booking confirmation' },
            { key: 'commission_updates', label: 'Commission Updates', desc: 'Real-time alerts when commission is credited' },
            { key: 'weekly_reports', label: 'Weekly Reports', desc: 'Automated weekly performance summaries' },
            { key: 'promotional_offers', label: 'Promotional Offers', desc: 'Exclusive deals and commission boosts' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <p className="text-sm font-semibold text-heading">{item.label}</p>
                <p className="text-xs text-text-secondary">{item.desc}</p>
              </div>
              <div
                onClick={() => handleToggle('notifications', item.key)}
                className={`w-12 h-6 rounded-full transition-all cursor-pointer ${settings?.notifications?.[item.key] ? 'gradient-bg' : 'bg-slate-200'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-soft transition-all ${settings?.notifications?.[item.key] ? 'ml-6 mt-0.5' : 'ml-0.5 mt-0.5'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <Globe className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-bold text-heading">General Preferences</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Currency', value: settings?.preferences?.currency || 'INR', options: ['INR', 'USD', 'EUR', 'AED'] },
            { label: 'Language', value: settings?.preferences?.language || 'en', options: ['en', 'hi', 'ar'] },
            { label: 'Timezone', value: settings?.preferences?.timezone || 'Asia/Kolkata', options: ['Asia/Kolkata', 'Asia/Dubai', 'America/New_York', 'Europe/London'] },
            { label: 'Default Service', value: settings?.preferences?.default_service || 'flight', options: ['flight', 'hotel', 'package', 'visa', 'insurance'] },
          ].map((field) => (
            <div key={field.label} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs text-text-secondary font-medium mb-2">{field.label}</p>
              <select
                value={field.value}
                onChange={(e) => setSettings(prev => ({ ...prev, preferences: { ...prev.preferences, [field.label.toLowerCase().replace(/ /g, '_')]: e.target.value } }))}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-heading focus:outline-none focus:border-primary transition-all"
              >
                {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <Shield className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-bold text-heading">Security Settings</h3>
        </div>
        <div className="space-y-4">
          {[
            { key: 'two_factor_enabled', label: 'Two-Factor Authentication', desc: 'Require OTP verification on login' },
            { key: 'login_alerts', label: 'Login Alerts', desc: 'Get notified of new login attempts' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <p className="text-sm font-semibold text-heading">{item.label}</p>
                <p className="text-xs text-text-secondary">{item.desc}</p>
              </div>
              <div
                onClick={() => handleToggle('security', item.key)}
                className={`w-12 h-6 rounded-full transition-all cursor-pointer ${settings?.security?.[item.key] ? 'gradient-bg' : 'bg-slate-200'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-soft transition-all ${settings?.security?.[item.key] ? 'ml-6 mt-0.5' : 'ml-0.5 mt-0.5'}`} />
              </div>
            </div>
          ))}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-heading">Session Timeout</p>
                <p className="text-xs text-text-secondary">Auto logout after inactivity</p>
              </div>
              <select
                value={settings?.security?.session_timeout || '30'}
                onChange={(e) => setSettings(prev => ({ ...prev, security: { ...prev.security, session_timeout: e.target.value } }))}
                className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-heading focus:outline-none focus:border-primary transition-all"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 gradient-bg text-white font-bold rounded-xl shadow-glow disabled:opacity-60 transition-all"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Settings className="w-4 h-4" />
          )}
          {saving ? 'Saving...' : 'Save Settings'}
        </motion.button>
      </div>
    </div>
  )
}
