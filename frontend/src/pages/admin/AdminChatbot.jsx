import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bot, Save, Sparkles, MessageSquare, Clock, Palette } from 'lucide-react'
import { adminService } from '../../services/adminService.js'

export default function AdminChatbot() {
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    adminService.getChatbotSettings().then(res => { setSettings(res.data || {}); setLoading(false) })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await adminService.updateChatbotSettings(settings)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (e) { console.error(e) }
    setSaving(false)
  }

  const update = (key, value) => setSettings({ ...settings, [key]: value })

  if (loading) return <div className="flex items-center justify-center h-96"><div className="w-10 h-10 border-3 border-slate-200 border-t-[#2563EB] rounded-full animate-spin" /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-heading">Chatbot Settings</h1>
          <p className="text-sm text-text-secondary mt-0.5">Configure your AI Travel Assistant</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 gradient-bg text-white text-xs font-bold rounded-xl shadow-glow disabled:opacity-60">
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* AI Identity */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center"><Bot className="w-4.5 h-4.5 text-white" /></div>
            <h3 className="text-sm font-bold text-heading">AI Identity</h3>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-text-secondary mb-1.5 block">AI Name</label>
              <input type="text" value={settings.ai_name || ''} onChange={(e) => update('ai_name', e.target.value)} className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-xs font-semibold text-text-secondary mb-1.5 block">Welcome Message</label>
              <textarea value={settings.welcome_message || ''} onChange={(e) => update('welcome_message', e.target.value)} rows="3" className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-xs font-semibold text-text-secondary mb-1.5 block flex items-center gap-1.5"><Palette className="w-3 h-3" /> Theme Color</label>
              <div className="flex items-center gap-2">
                <input type="color" value={settings.theme_color || '#2563EB'} onChange={(e) => update('theme_color', e.target.value)} className="w-12 h-10 rounded-lg border border-slate-200 cursor-pointer" />
                <input type="text" value={settings.theme_color || ''} onChange={(e) => update('theme_color', e.target.value)} className="flex-1 px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary font-mono" />
              </div>
            </div>
          </div>
        </div>

        {/* Behavior */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center"><Sparkles className="w-4.5 h-4.5 text-purple-500" /></div>
            <h3 className="text-sm font-bold text-heading">Behavior</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div>
                <p className="text-sm font-semibold text-heading">Online Status</p>
                <p className="text-xs text-text-tertiary">Show online indicator</p>
              </div>
              <button onClick={() => update('online_status', settings.online_status === 'true' ? 'false' : 'true')} className={`relative w-14 h-7 rounded-full transition-all ${settings.online_status === 'true' ? 'gradient-bg' : 'bg-slate-200'}`}>
                <motion.div animate={{ x: settings.online_status === 'true' ? 28 : 2 }} className="absolute top-1 w-5 h-5 rounded-full bg-white shadow" />
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div>
                <p className="text-sm font-semibold text-heading">Auto Reply</p>
                <p className="text-xs text-text-tertiary">Enable automatic responses</p>
              </div>
              <button onClick={() => update('auto_reply_enabled', settings.auto_reply_enabled === 'true' ? 'false' : 'true')} className={`relative w-14 h-7 rounded-full transition-all ${settings.auto_reply_enabled === 'true' ? 'gradient-bg' : 'bg-slate-200'}`}>
                <motion.div animate={{ x: settings.auto_reply_enabled === 'true' ? 28 : 2 }} className="absolute top-1 w-5 h-5 rounded-full bg-white shadow" />
              </button>
            </div>
            <div>
              <label className="text-xs font-semibold text-text-secondary mb-1.5 block flex items-center gap-1.5"><Clock className="w-3 h-3" /> Typing Delay (ms)</label>
              <input type="number" value={settings.typing_delay || ''} onChange={(e) => update('typing_delay', e.target.value)} className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center"><MessageSquare className="w-4.5 h-4.5 text-blue-500" /></div>
            <h3 className="text-sm font-bold text-heading">Suggestions & Quick Replies</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-text-secondary mb-1.5 block">Welcome Suggestions (comma separated)</label>
              <textarea
                value={Array.isArray(settings.suggestions) ? settings.suggestions.join(', ') : settings.suggestions || ''}
                onChange={(e) => update('suggestions', e.target.value.split(',').map(s => s.trim()))}
                rows="4" className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-text-secondary mb-1.5 block">Quick Replies (comma separated)</label>
              <textarea
                value={Array.isArray(settings.quick_replies) ? settings.quick_replies.join(', ') : settings.quick_replies || ''}
                onChange={(e) => update('quick_replies', e.target.value.split(',').map(s => s.trim()))}
                rows="4" className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
