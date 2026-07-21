import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, Sparkles, Save, ToggleLeft, ToggleRight, MessageSquare, Zap, Brain, Settings2 } from 'lucide-react'

export default function AdminAISettings() {
  const [settings, setSettings] = useState({
    enabled: true,
    model: 'gpt-4-turbo',
    temperature: 0.7,
    maxTokens: 2048,
    systemPrompt: 'You are a helpful AI travel assistant for a B2B travel platform. Help agents with flight bookings, hotel reservations, visa applications, travel insurance, and holiday packages. Always be professional and concise.',
    welcomeMessage: "Hello! I'm your AI Travel Assistant. How can I help you today?",
    fallbackResponse: "I'm sorry, I didn't understand that. Could you please rephrase? You can ask me about flights, hotels, visas, insurance, packages, bookings, and more.",
    autoRespond: true,
    collectFeedback: true,
    maxConversationLength: 50,
    rateLimitPerHour: 100,
    languages: ['English', 'Hindi', 'Arabic', 'Chinese'],
    intentConfidence: 0.75,
  })

  const [toggles, setToggles] = useState({
    flightBooking: true,
    hotelBooking: true,
    visaAssist: true,
    insuranceQuery: true,
    packageRecommend: true,
    walletQuery: true,
    bookingStatus: true,
    humanHandoff: true,
  })

  const toggle = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }))
  const updateSetting = (key, value) => setSettings(prev => ({ ...prev, [key]: value }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-heading">AI Settings</h1>
          <p className="text-sm text-text-secondary mt-0.5">Configure AI chatbot behavior and capabilities</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 gradient-bg text-white text-sm font-semibold rounded-xl shadow-glow">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Conversations', value: '12,840', icon: MessageSquare, color: 'text-blue-600 bg-blue-50' },
          { label: 'Avg. Response Time', value: '1.2s', icon: Zap, color: 'text-amber-600 bg-amber-50' },
          { label: 'Resolution Rate', value: '87%', icon: Brain, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Active Intents', value: Object.values(toggles).filter(Boolean).length, icon: Sparkles, color: 'text-violet-600 bg-violet-50' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><s.icon className="w-5 h-5" /></div>
            <p className="text-sm text-text-secondary font-medium">{s.label}</p>
            <p className="text-2xl font-extrabold text-heading mt-1">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Configuration */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Settings2 className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-heading">Model Configuration</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-heading mb-1.5 block">AI Model</label>
              <select value={settings.model} onChange={(e) => updateSetting('model', e.target.value)} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
                <option value="gpt-4-turbo">GPT-4 Turbo</option>
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="claude-3">Claude 3</option>
                <option value="gemini-pro">Gemini Pro</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-heading mb-1.5 block">Temperature: {settings.temperature}</label>
              <input type="range" min="0" max="1" step="0.1" value={settings.temperature} onChange={(e) => updateSetting('temperature', parseFloat(e.target.value))} className="w-full accent-primary" />
            </div>
            <div>
              <label className="text-sm font-medium text-heading mb-1.5 block">Max Tokens</label>
              <input type="number" value={settings.maxTokens} onChange={(e) => updateSetting('maxTokens', parseInt(e.target.value))} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-sm font-medium text-heading mb-1.5 block">Intent Confidence Threshold: {settings.intentConfidence}</label>
              <input type="range" min="0.5" max="1" step="0.05" value={settings.intentConfidence} onChange={(e) => updateSetting('intentConfidence', parseFloat(e.target.value))} className="w-full accent-primary" />
            </div>
            <div>
              <label className="text-sm font-medium text-heading mb-1.5 block">Rate Limit (per hour)</label>
              <input type="number" value={settings.rateLimitPerHour} onChange={(e) => updateSetting('rateLimitPerHour', parseInt(e.target.value))} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
            </div>
          </div>
        </div>

        {/* Intent Toggles */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Bot className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-heading">AI Capabilities</h3>
          </div>
          <div className="space-y-3">
            {[
              { key: 'flightBooking', label: 'Flight Booking', desc: 'Search and book flights' },
              { key: 'hotelBooking', label: 'Hotel Booking', desc: 'Search and book hotels' },
              { key: 'visaAssist', label: 'Visa Assistance', desc: 'Visa application guidance' },
              { key: 'insuranceQuery', label: 'Insurance Queries', desc: 'Travel insurance plans' },
              { key: 'packageRecommend', label: 'Package Recommendations', desc: 'Suggest holiday packages' },
              { key: 'walletQuery', label: 'Wallet Queries', desc: 'Balance and transaction info' },
              { key: 'bookingStatus', label: 'Booking Status', desc: 'Check booking status' },
              { key: 'humanHandoff', label: 'Human Handoff', desc: 'Escalate to human support' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-sm font-semibold text-heading">{item.label}</p>
                  <p className="text-xs text-text-tertiary">{item.desc}</p>
                </div>
                <button onClick={() => toggle(item.key)} className="shrink-0">
                  {toggles[item.key] ? <ToggleRight className="w-8 h-8 text-primary" /> : <ToggleLeft className="w-8 h-8 text-slate-300" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* System Prompt */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Brain className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-heading">System Prompt</h3>
          </div>
          <textarea value={settings.systemPrompt} onChange={(e) => updateSetting('systemPrompt', e.target.value)} rows={5} className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary resize-none" />
          <div className="mt-4">
            <label className="text-sm font-medium text-heading mb-1.5 block">Welcome Message</label>
            <input type="text" value={settings.welcomeMessage} onChange={(e) => updateSetting('welcomeMessage', e.target.value)} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium text-heading mb-1.5 block">Fallback Response</label>
            <textarea value={settings.fallbackResponse} onChange={(e) => updateSetting('fallbackResponse', e.target.value)} rows={2} className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary resize-none" />
          </div>
        </div>

        {/* General Settings */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-heading">General Settings</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div><p className="text-sm font-semibold text-heading">Enable AI Chatbot</p><p className="text-xs text-text-tertiary">Activate chatbot for all agents</p></div>
              <button onClick={() => updateSetting('enabled', !settings.enabled)}>{settings.enabled ? <ToggleRight className="w-8 h-8 text-primary" /> : <ToggleLeft className="w-8 h-8 text-slate-300" />}</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div><p className="text-sm font-semibold text-heading">Auto-Respond</p><p className="text-xs text-text-tertiary">Automatically respond to queries</p></div>
              <button onClick={() => updateSetting('autoRespond', !settings.autoRespond)}>{settings.autoRespond ? <ToggleRight className="w-8 h-8 text-primary" /> : <ToggleLeft className="w-8 h-8 text-slate-300" />}</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div><p className="text-sm font-semibold text-heading">Collect Feedback</p><p className="text-xs text-text-tertiary">Ask users to rate responses</p></div>
              <button onClick={() => updateSetting('collectFeedback', !settings.collectFeedback)}>{settings.collectFeedback ? <ToggleRight className="w-8 h-8 text-primary" /> : <ToggleLeft className="w-8 h-8 text-slate-300" />}</button>
            </div>
            <div>
              <label className="text-sm font-medium text-heading mb-1.5 block">Max Conversation Length</label>
              <input type="number" value={settings.maxConversationLength} onChange={(e) => updateSetting('maxConversationLength', parseInt(e.target.value))} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-sm font-medium text-heading mb-1.5 block">Supported Languages</label>
              <div className="flex flex-wrap gap-2">
                {settings.languages.map(lang => <span key={lang} className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 border border-primary/20 rounded-full">{lang}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
