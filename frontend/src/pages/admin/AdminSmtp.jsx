import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Mail, Server, Send, TestTube, CheckCircle2, AlertCircle, ToggleLeft, ToggleRight } from 'lucide-react'

export default function AdminSmtp() {
  const [config, setConfig] = useState({
    driver: 'smtp',
    host: 'smtp.gmail.com',
    port: 587,
    encryption: 'tls',
    username: 'noreply@travelhub.com',
    password: '••••••••••••',
    fromName: 'TravelHub',
    fromEmail: 'noreply@travelhub.com',
    replyTo: 'support@travelhub.com',
  })

  const [toggles, setToggles] = useState({
    enabled: true,
    queue: true,
    tracking: true,
    unsubscribe: true,
  })

  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState(null)

  const toggle = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }))
  const update = (key, value) => setConfig(prev => ({ ...prev, [key]: value }))

  const handleTest = () => {
    setTesting(true)
    setTestResult(null)
    setTimeout(() => {
      setTesting(false)
      setTestResult('success')
    }, 2000)
  }

  const emailStats = [
    { label: 'Sent Today', value: '1,248', icon: Send, color: 'text-blue-600 bg-blue-50' },
    { label: 'Delivered', value: '1,215', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Bounced', value: '12', icon: AlertCircle, color: 'text-red-600 bg-red-50' },
    { label: 'Open Rate', value: '68%', icon: Mail, color: 'text-violet-600 bg-violet-50' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-heading">SMTP Configuration</h1>
          <p className="text-sm text-text-secondary mt-0.5">Configure email delivery and SMTP settings</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 gradient-bg text-white text-sm font-semibold rounded-xl shadow-glow">
          <Save className="w-4 h-4" /> Save Settings
        </button>
      </div>

      {/* Email Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {emailStats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><s.icon className="w-5 h-5" /></div>
            <p className="text-sm text-text-secondary font-medium">{s.label}</p>
            <p className="text-2xl font-extrabold text-heading mt-1">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SMTP Server Settings */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5"><Server className="w-5 h-5 text-primary" /><h3 className="text-lg font-bold text-heading">SMTP Server</h3></div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-heading mb-1.5 block">Mail Driver</label>
              <select value={config.driver} onChange={(e) => update('driver', e.target.value)} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
                <option value="smtp">SMTP</option>
                <option value="sendmail">Sendmail</option>
                <option value="ses">Amazon SES</option>
                <option value="mailgun">Mailgun</option>
                <option value="postmark">Postmark</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-heading mb-1.5 block">SMTP Host</label>
              <input type="text" value={config.host} onChange={(e) => update('host', e.target.value)} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-heading mb-1.5 block">Port</label>
                <input type="number" value={config.port} onChange={(e) => update('port', parseInt(e.target.value))} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-sm font-medium text-heading mb-1.5 block">Encryption</label>
                <select value={config.encryption} onChange={(e) => update('encryption', e.target.value)} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
                  <option value="tls">TLS</option>
                  <option value="ssl">SSL</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-heading mb-1.5 block">Username</label>
              <input type="text" value={config.username} onChange={(e) => update('username', e.target.value)} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-sm font-medium text-heading mb-1.5 block">Password</label>
              <input type="password" value={config.password} onChange={(e) => update('password', e.target.value)} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
            </div>
          </div>
        </div>

        {/* Sender Settings + Toggles */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5"><Mail className="w-5 h-5 text-primary" /><h3 className="text-lg font-bold text-heading">Sender Settings</h3></div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-heading mb-1.5 block">From Name</label>
                <input type="text" value={config.fromName} onChange={(e) => update('fromName', e.target.value)} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-sm font-medium text-heading mb-1.5 block">From Email</label>
                <input type="email" value={config.fromEmail} onChange={(e) => update('fromEmail', e.target.value)} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-sm font-medium text-heading mb-1.5 block">Reply-To Email</label>
                <input type="email" value={config.replyTo} onChange={(e) => update('replyTo', e.target.value)} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-heading mb-5">Email Options</h3>
            <div className="space-y-3">
              {[
                { key: 'enabled', label: 'Enable Email Sending', desc: 'Allow outgoing emails' },
                { key: 'queue', label: 'Queue Emails', desc: 'Send emails via background queue' },
                { key: 'tracking', label: 'Email Tracking', desc: 'Track opens and clicks' },
                { key: 'unsubscribe', label: 'Unsubscribe Link', desc: 'Include unsubscribe in emails' },
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

      {/* Test Configuration */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5"><TestTube className="w-5 h-5 text-primary" /><h3 className="text-lg font-bold text-heading">Test SMTP Configuration</h3></div>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
          <div className="flex-1 w-full">
            <label className="text-sm font-medium text-heading mb-1.5 block">Test Email Address</label>
            <input type="email" defaultValue="admin@travelhub.com" className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
          </div>
          <button onClick={handleTest} disabled={testing} className="inline-flex items-center gap-2 px-5 py-2.5 gradient-bg text-white text-sm font-semibold rounded-xl shadow-glow disabled:opacity-50">
            {testing ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
            {testing ? 'Sending...' : 'Send Test Email'}
          </button>
        </div>
        {testResult === 'success' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <p className="text-sm text-green-600">Test email sent successfully! Check your inbox.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
