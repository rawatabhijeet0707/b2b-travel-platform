import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User, Mail, Phone, Building2, MapPin, Star, Award,
  Calendar, Wallet, Shield, Edit3, Camera, CheckCircle2, FileCheck,
  CreditCard, BookOpen, Globe, Zap
} from 'lucide-react'
import PremiumBadge from '../../components/ui/PremiumBadge.jsx'
import AnimatedBlobs from '../../components/ui/AnimatedBlobs.jsx'
import { authService } from '../../services/authService.js'

export default function ProfilePage() {
  const user = authService.getUser() || {}
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'agency', label: 'Agency Details' },
    { key: 'preferences', label: 'Preferences' },
  ]

  return (
    <div className="relative p-4 sm:p-6 lg:p-8 space-y-6 gradient-mesh min-h-screen">
      <AnimatedBlobs />

      {/* Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative glass-strong rounded-card p-6 sm:p-8 shadow-card overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-3xl gradient-bg flex items-center justify-center text-white text-3xl font-extrabold shadow-glow">
              {(user.full_name || user.agency_name || 'U').charAt(0).toUpperCase()}
            </div>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl glass-strong border border-white/60 flex items-center justify-center shadow-card hover:scale-110 transition-transform">
              <Camera className="w-4 h-4 text-text" />
            </button>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h1 className="text-2xl font-extrabold text-heading font-heading">{user.agency_name || user.full_name || 'User'}</h1>
              <PremiumBadge variant={user.kyc_status === 'verified' ? 'success' : 'warning'} icon={user.kyc_status === 'verified' ? CheckCircle2 : FileCheck}>
                {(user.kyc_status || 'pending').toUpperCase()}
              </PremiumBadge>
              {user.role === 'admin' && <PremiumBadge variant="primary" icon={Zap}>ADMIN</PremiumBadge>}
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/40 border border-white/50 text-sm font-semibold text-heading hover:shadow-card transition-all"
          >
            <Edit3 className="w-4 h-4" /> Edit Profile
          </motion.button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          {[
            { icon: BookOpen, label: 'Total Bookings', value: '1,248', color: 'text-primary bg-primary/10' },
            { icon: Wallet, label: 'Wallet Balance', value: '₹2.48L', color: 'text-emerald-600 bg-emerald-50' },
            { icon: Award, label: 'Reward Points', value: '45.2K', color: 'text-amber-600 bg-amber-50' },
            { icon: Star, label: 'Rating', value: '4.8', color: 'text-cyan-600 bg-cyan-50' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-2xl bg-white/40 border border-white/50"
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
      <div className="flex gap-1 bg-white/40 rounded-xl p-1 border border-white/50 w-fit">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === tab.key ? 'gradient-bg text-white shadow-soft' : 'text-text-secondary hover:text-heading hover:bg-white/60'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-strong rounded-card p-6 shadow-card">
            <h3 className="text-lg font-bold text-heading font-heading font-heading mb-5">Personal Information</h3>
            <div className="space-y-4">
              {[
                { icon: User, label: 'Full Name', value: user.full_name || 'N/A' },
                { icon: Mail, label: 'Email', value: user.email || 'N/A' },
                { icon: Phone, label: 'Mobile', value: `+91 ${user.mobile || 'N/A'}` },
                { icon: Building2, label: 'Agency', value: user.agency_name || 'N/A' },
                { icon: MapPin, label: 'Location', value: 'Mumbai, Maharashtra, India' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-xl bg-white/40 border border-white/50"
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

          <div className="glass-strong rounded-card p-6 shadow-card">
            <h3 className="text-lg font-bold text-heading font-heading font-heading mb-5">Account Status</h3>
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
                  className="flex items-center gap-4 p-3 rounded-xl bg-white/40 border border-white/50"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-text-secondary font-medium">{item.label}</p>
                    <p className="text-sm font-semibold text-heading capitalize">{item.status}</p>
                  </div>
                  <PremiumBadge variant={item.variant}>{item.status}</PremiumBadge>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'agency' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-strong rounded-card p-6 shadow-card">
          <h3 className="text-lg font-bold text-heading font-heading font-heading mb-5">Agency Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Agency Name', value: user.agency_name || 'SkyHigh Travels' },
              { label: 'IATA Code', value: '12345678' },
              { label: 'PAN Number', value: 'ABCDE1234F' },
              { label: 'GST Number', value: '27ABCDE1234F1Z5' },
              { label: 'Business Type', value: 'Travel Agency' },
              { label: 'Established', value: '2018' },
              { label: 'Address', value: '123 Business Hub, Mumbai, MH 400001' },
              { label: 'Website', value: 'www.skyhightravels.com' },
            ].map((field, i) => (
              <motion.div
                key={field.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-xl bg-white/40 border border-white/50"
              >
                <p className="text-xs text-text-secondary font-medium mb-1">{field.label}</p>
                <p className="text-sm font-semibold text-heading">{field.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'preferences' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-strong rounded-card p-6 shadow-card">
          <h3 className="text-lg font-bold text-heading font-heading font-heading mb-5">Preferences</h3>
          <div className="space-y-4">
            {[
              { label: 'Email Notifications', desc: 'Receive booking confirmations and updates', enabled: true },
              { label: 'SMS Alerts', desc: 'Get critical alerts via SMS', enabled: true },
              { label: 'Promotional Offers', desc: 'Exclusive deals and commission boosts', enabled: false },
              { label: 'Weekly Reports', desc: 'Automated performance summaries', enabled: true },
              { label: 'Two-Factor Authentication', desc: 'Extra security on login', enabled: true },
            ].map((pref, i) => (
              <motion.div
                key={pref.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-white/40 border border-white/50"
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
