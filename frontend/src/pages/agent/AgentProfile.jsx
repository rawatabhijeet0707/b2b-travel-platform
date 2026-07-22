import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User, Mail, Phone, Building2, MapPin, Star, Award,
  Calendar, Wallet, Shield, Edit3, Camera, CheckCircle2, FileCheck,
  CreditCard, BookOpen, Globe, Zap
} from 'lucide-react'
import { authService } from '../../services/authService.js'

export default function AgentProfile() {
  const user = authService.getStoredUser() || {}
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'agency', label: 'Agency Details' },
    { key: 'preferences', label: 'Preferences' },
  ]

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-3xl gradient-bg flex items-center justify-center text-white text-3xl font-extrabold shadow-glow">
              {(user.full_name || user.agency_name || 'A').charAt(0).toUpperCase()}
            </div>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
              <Camera className="w-4 h-4 text-text" />
            </button>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h1 className="text-2xl font-extrabold text-heading">{user.agency_name || user.full_name || 'Agent'}</h1>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                user.kyc_status === 'verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-amber-50 text-amber-600 border-amber-200'
              }`}>
                {(user.kyc_status || 'pending').toUpperCase()}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border bg-primary-50 text-primary border-primary/20">
                <Zap className="w-3 h-3" /> AGENT
              </span>
            </div>
            <p className="text-text-secondary text-sm flex items-center gap-2">
              <Mail className="w-4 h-4" /> {user.email || 'N/A'}
            </p>
            <p className="text-text-secondary text-sm flex items-center gap-2 mt-1">
              <Phone className="w-4 h-4" /> +91 {user.mobile || 'N/A'}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-heading hover:shadow-sm transition-all"
          >
            <Edit3 className="w-4 h-4" /> Edit Profile
          </motion.button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          {[
            { icon: BookOpen, label: 'Total Bookings', value: '248', color: 'text-primary bg-primary/10' },
            { icon: Wallet, label: 'Wallet Balance', value: '₹51.6K', color: 'text-emerald-600 bg-emerald-50' },
            { icon: Award, label: 'Reward Points', value: '12.5K', color: 'text-amber-600 bg-amber-50' },
            { icon: Star, label: 'Rating', value: '4.8', color: 'text-cyan-600 bg-cyan-50' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl bg-slate-50 border border-slate-100"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <p className="text-xs text-text-secondary font-medium">{stat.label}</p>
              <p className="text-lg font-extrabold text-heading mt-0.5">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-50 rounded-xl p-1 border border-slate-200 w-fit">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === tab.key ? 'gradient-bg text-white shadow-soft' : 'text-text-secondary hover:text-heading hover:bg-white'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-heading mb-5">Personal Information</h3>
            <div className="space-y-4">
              {[
                { icon: User, label: 'Full Name', value: user.full_name || 'N/A' },
                { icon: Mail, label: 'Email', value: user.email || 'N/A' },
                { icon: Phone, label: 'Mobile', value: `+91 ${user.mobile || 'N/A'}` },
                { icon: Building2, label: 'Agency', value: user.agency_name || 'N/A' },
                { icon: MapPin, label: 'Location', value: user.business_address || 'N/A' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-text-secondary font-medium">{item.label}</p>
                    <p className="text-sm font-semibold text-heading truncate">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-heading mb-5">Account Status</h3>
            <div className="space-y-4">
              {[
                { icon: Shield, label: 'KYC Verification', status: user.kyc_status || 'pending', variant: user.kyc_status === 'verified' ? 'success' : 'warning' },
                { icon: FileCheck, label: 'Agency Verification', status: 'verified', variant: 'success' },
                { icon: CreditCard, label: 'Payment Setup', status: 'active', variant: 'success' },
                { icon: Globe, label: 'API Access', status: 'enabled', variant: 'success' },
                { icon: Calendar, label: 'Member Since', status: 'Jan 2025', variant: 'neutral' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-text-secondary font-medium">{item.label}</p>
                    <p className="text-sm font-semibold text-heading capitalize">{item.status}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                    item.variant === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                    item.variant === 'warning' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                    'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {item.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'agency' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-heading mb-5">Agency Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Agency Name', value: user.agency_name || 'Global Travel Connect' },
              { label: 'IATA Code', value: '12345678' },
              { label: 'PAN Number', value: user.pan_number || 'FGHIJ5678G' },
              { label: 'GST Number', value: user.gst_number || '29FGHIJ5678G1Z5' },
              { label: 'Business Type', value: 'Travel Agency' },
              { label: 'Established', value: '2020' },
              { label: 'Address', value: user.business_address || 'Connaught Place, New Delhi, 110001' },
              { label: 'Website', value: 'www.globaltravelconnect.com' },
            ].map((field, i) => (
              <motion.div
                key={field.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-xl bg-slate-50 border border-slate-100"
              >
                <p className="text-xs text-text-secondary font-medium mb-1">{field.label}</p>
                <p className="text-sm font-semibold text-heading">{field.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'preferences' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-heading mb-5">Preferences</h3>
          <div className="space-y-4">
            {[
              { label: 'Email Notifications', desc: 'Receive booking confirmations and updates', enabled: true },
              { label: 'SMS Alerts', desc: 'Get critical alerts via SMS', enabled: true },
              { label: 'Commission Updates', desc: 'Real-time commission credit alerts', enabled: true },
              { label: 'Weekly Reports', desc: 'Automated performance summaries', enabled: true },
              { label: 'Two-Factor Authentication', desc: 'Extra security on login', enabled: true },
            ].map((pref, i) => (
              <motion.div
                key={pref.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100"
              >
                <div>
                  <p className="text-sm font-semibold text-heading">{pref.label}</p>
                  <p className="text-xs text-text-secondary">{pref.desc}</p>
                </div>
                <div className={`w-12 h-6 rounded-full transition-all cursor-pointer ${pref.enabled ? 'gradient-bg' : 'bg-slate-200'}`}>
                  <div className={`w-5 h-5 rounded-full bg-white shadow-soft transition-all ${pref.enabled ? 'ml-6 mt-0.5' : 'ml-0.5 mt-0.5'}`} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
