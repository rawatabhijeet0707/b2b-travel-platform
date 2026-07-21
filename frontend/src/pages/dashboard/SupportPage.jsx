import { motion } from 'framer-motion'
import { Headphones, Plus, Search, MessageSquare, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react'
import Badge from '../../components/ui/Badge.jsx'
import AnimatedBlobs from '../../components/ui/AnimatedBlobs.jsx'

const tickets = [
  { id: '#TKT-2401', subject: 'Refund delay for flight booking', priority: 'High', status: 'Open', date: 'Jan 18, 2025', replies: 2 },
  { id: '#TKT-2398', subject: 'Hotel booking modification request', priority: 'Medium', status: 'Resolved', date: 'Jan 17, 2025', replies: 5 },
  { id: '#TKT-2390', subject: 'Visa document submission query', priority: 'Low', status: 'In Progress', date: 'Jan 16, 2025', replies: 3 },
  { id: '#TKT-2385', subject: 'Wallet top-up failed', priority: 'High', status: 'Resolved', date: 'Jan 14, 2025', replies: 4 },
  { id: '#TKT-2380', subject: 'Bulk booking discount inquiry', priority: 'Medium', status: 'Open', date: 'Jan 12, 2025', replies: 1 },
]

const priorityVariant = { High: 'danger', Medium: 'warning', Low: 'neutral' }
const statusVariant = { Open: 'warning', Resolved: 'success', 'In Progress': 'primary' }

export default function SupportPage() {
  return (
    <div className="relative p-4 sm:p-6 lg:p-8 space-y-6 gradient-mesh min-h-screen">
      <AnimatedBlobs />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-heading font-heading">Support Center</h1>
          <p className="text-text-secondary mt-1">Get help with your bookings, account, and more.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-6 py-3 gradient-bg text-white font-semibold rounded-xl hover:shadow-glow transition-all">
          <Plus className="w-5 h-5" /> New Ticket
        </button>
      </motion.div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Phone, title: 'Call Us', value: '+91 1800 123 4567', desc: 'Toll-free, 24/7', color: 'bg-primary/10 text-primary' },
          { icon: Mail, title: 'Email', value: 'support@traveldistrib.com', desc: 'Response within 2 hours', color: 'bg-accent/10 text-accent' },
          { icon: MessageSquare, title: 'Live Chat', value: 'Chat with agent', desc: 'Available 24/7', color: 'bg-success/10 text-success' },
        ].map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-strong rounded-card p-6 shadow-card hover:shadow-floating transition-all cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${c.color}`}>
              <c.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-heading font-heading">{c.title}</h3>
            <p className="text-sm font-semibold text-primary mt-1">{c.value}</p>
            <p className="text-xs text-text-secondary mt-1">{c.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Tickets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-strong rounded-card shadow-card overflow-hidden"
      >
        <div className="p-6 border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-heading font-heading">Your Support Tickets</h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input type="text" placeholder="Search tickets..." className="w-full pl-9 pr-3 py-2 bg-white/40 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-all" />
          </div>
        </div>
        <div className="divide-y divide-border/40">
          {tickets.map((t) => (
            <div key={t.id} className="flex items-center gap-4 p-5 hover:bg-bg/50 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-text-secondary">{t.id}</span>
                  <Badge variant={priorityVariant[t.priority]}>{t.priority}</Badge>
                </div>
                <p className="text-sm font-semibold text-heading truncate">{t.subject}</p>
                <p className="text-xs text-text-secondary mt-0.5 flex items-center gap-2">
                  <Clock className="w-3 h-3" /> {t.date}
                  <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {t.replies} replies</span>
                </p>
              </div>
              <Badge variant={statusVariant[t.status]}>{t.status}</Badge>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
