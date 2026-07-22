import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bell, CheckCheck, Plane, Wallet, Award, Headphones, Package,
  Stamp, ShieldCheck, CreditCard, Settings, Clock,
} from 'lucide-react'
import Badge from '../../components/ui/Badge.jsx'
import AnimatedBlobs from '../../components/ui/AnimatedBlobs.jsx'

const notifications = [
  { id: 1, title: 'Booking Confirmed', desc: 'Your flight BOM → SIN (TD-3401) has been confirmed.', time: '2 min ago', type: 'booking', read: false, icon: Plane, color: 'bg-primary/10 text-primary' },
  { id: 2, title: 'Wallet Top-up Successful', desc: '₹10,000 added to your wallet via UPI.', time: '1 hour ago', type: 'wallet', read: false, icon: Wallet, color: 'bg-success/10 text-success' },
  { id: 3, title: 'Reward Points Earned', desc: 'You earned 500 reward points from your latest booking.', time: '3 hours ago', type: 'reward', read: false, icon: Award, color: 'bg-amber-50 text-amber-600' },
  { id: 4, title: 'Hotel Booking Pending', desc: 'Your hotel booking at Burj View Suite (TD-3407) is pending confirmation.', time: '5 hours ago', type: 'booking', read: true, icon: Package, color: 'bg-cyan-50 text-cyan-600' },
  { id: 5, title: 'Visa Approved', desc: 'Thailand Visa (TD-3404) has been approved.', time: 'Yesterday', type: 'visa', read: true, icon: Stamp, color: 'bg-violet-50 text-violet-600' },
  { id: 6, title: 'Insurance Active', desc: 'Your travel insurance policy (TD-3406) is now active.', time: 'Yesterday', type: 'insurance', read: true, icon: ShieldCheck, color: 'bg-emerald-50 text-emerald-600' },
  { id: 7, title: 'Payment Successful', desc: 'Payment of ₹18,999 for TD-3403 completed.', time: '2 days ago', type: 'payment', read: true, icon: CreditCard, color: 'bg-primary/10 text-primary' },
  { id: 8, title: 'Support Ticket Resolved', desc: 'Your ticket #TKT-2401 about refund delay has been resolved.', time: '3 days ago', type: 'support', read: true, icon: Headphones, color: 'bg-rose-50 text-rose-600' },
  { id: 9, title: 'Festive Season Offer', desc: 'Get up to 20% extra commission on holiday packages this season!', time: '4 days ago', type: 'offer', read: true, icon: Award, color: 'bg-orange-50 text-orange-600' },
  { id: 10, title: 'Profile Updated', desc: 'Your profile information has been updated successfully.', time: '5 days ago', type: 'system', read: true, icon: Settings, color: 'bg-slate-100 text-slate-600' },
]

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all')
  const [items, setItems] = useState(notifications)

  const filtered = filter === 'unread' ? items.filter(n => !n.read) : filter === 'read' ? items.filter(n => n.read) : items

  const unreadCount = items.filter(n => !n.read).length

  const markAllRead = () => {
    setItems(prev => prev.map(n => ({ ...n, read: true })))
  }

  return (
    <div className="relative p-4 sm:p-6 lg:p-8 space-y-6 gradient-mesh min-h-screen">
      <AnimatedBlobs />

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-heading font-heading">Notifications</h1>
          <p className="text-text-secondary mt-1">
            {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'You\'re all caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={markAllRead}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg text-white text-sm font-semibold shadow-glow"
          >
            <CheckCheck className="w-4 h-4" /> Mark All Read
          </motion.button>
        )}
      </motion.div>

      {/* Filter Tabs */}
      <div className="relative flex gap-2">
        {[
          { key: 'all', label: 'All', count: items.length },
          { key: 'unread', label: 'Unread', count: unreadCount },
          { key: 'read', label: 'Read', count: items.length - unreadCount },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              filter === tab.key
                ? 'gradient-bg text-white shadow-soft'
                : 'bg-white/40 border border-white/50 text-text-secondary hover:text-heading'
            }`}
          >
            {tab.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${filter === tab.key ? 'bg-white/20' : 'bg-slate-200/60'}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative glass-strong rounded-card shadow-card overflow-hidden"
      >
        <div className="divide-y divide-border/40">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Bell className="w-12 h-12 text-text-tertiary mb-3" />
              <p className="text-sm text-text-secondary">No notifications in this category.</p>
            </div>
          ) : filtered.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-start gap-4 p-5 hover:bg-white/30 transition-colors cursor-pointer ${!n.read ? 'bg-primary/5' : ''}`}
            >
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${n.color}`}>
                <n.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-heading">{n.title}</p>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                </div>
                <p className="text-sm text-text-secondary">{n.desc}</p>
                <p className="text-xs text-text-tertiary mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {n.time}
                </p>
              </div>
              {!n.read && <Badge variant="primary">New</Badge>}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
