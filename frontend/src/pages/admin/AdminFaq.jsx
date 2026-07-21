import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, Plus, Search, Edit2, Trash2, X, ChevronDown, ChevronUp } from 'lucide-react'

const dummyFaqs = [
  { id: 1, category: 'General', question: 'What is TravelHub?', answer: 'TravelHub is a comprehensive B2B travel distribution platform that connects travel agencies with airlines, hotels, visa services, insurance providers, and holiday package operators. We provide a single platform for all your travel business needs.', order: 1, status: 'published' },
  { id: 2, category: 'Account', question: 'How do I create an account?', answer: 'Click on the "Register" button on our homepage, fill in your agency details including PAN and GST numbers, verify your mobile number via OTP, and your account will be created instantly. KYC verification typically takes 24-48 hours.', order: 2, status: 'published' },
  { id: 3, category: 'Payments', question: 'What payment methods are supported?', answer: 'We support multiple payment methods including Razorpay, PhonePe, Cashfree, PayU, Stripe, PayPal, bank transfers, and wallet payments. All transactions are secured with 256-bit SSL encryption.', order: 3, status: 'published' },
  { id: 4, category: 'Bookings', question: 'How long does it take to confirm a booking?', answer: 'Flight bookings are confirmed instantly. Hotel bookings typically take 15-30 minutes. Visa processing depends on the country (3-30 days). Package bookings are confirmed within 24 hours.', order: 4, status: 'published' },
  { id: 5, category: 'Wallet', question: 'How does the wallet system work?', answer: 'Your wallet can be topped up using any supported payment method. All bookings are deducted from your wallet balance. You also get reward points on every transaction which can be redeemed for discounts.', order: 5, status: 'published' },
  { id: 6, category: 'Commission', question: 'What commission rates do you offer?', answer: 'Commission rates vary by service: Flights (3-8%), Hotels (8-15%), Packages (5-12%), Visa (5-10%), Insurance (10-20%). Premium agents get higher commission rates based on monthly booking volume.', order: 6, status: 'published' },
  { id: 7, category: 'KYC', question: 'What documents are required for KYC verification?', answer: 'You need to submit: PAN Card, GST Certificate (if applicable), Business Registration Certificate, Cancelled Cheque, and Agency Owner ID Proof. KYC is typically approved within 24-48 hours of submission.', order: 7, status: 'published' },
  { id: 8, category: 'Support', question: 'How can I contact customer support?', answer: 'We offer 24/7 customer support via multiple channels: Live Chat (available on the dashboard), Email (support@travelhub.com), Phone (+91-1800-XXX-XXXX), and WhatsApp. You can also raise support tickets from your dashboard.', order: 8, status: 'published' },
  { id: 9, category: 'Technical', question: 'Do you offer an API for integration?', answer: 'Yes, we provide comprehensive REST APIs for all our services. API documentation is available in the developer section. We also offer white-label solutions for agencies wanting their own branded platform.', order: 9, status: 'published' },
  { id: 10, category: 'Refunds', question: 'How are refunds processed?', answer: 'Refunds are processed back to the original payment method within 5-7 business days. For wallet payments, refunds are instant. Cancellation charges may apply depending on the service provider policy.', order: 10, status: 'draft' },
]

const categoryColors = { General: 'text-blue-600 bg-blue-50 border-blue-200', Account: 'text-green-600 bg-green-50 border-green-200', Payments: 'text-purple-600 bg-purple-50 border-purple-200', Bookings: 'text-amber-600 bg-amber-50 border-amber-200', Wallet: 'text-cyan-600 bg-cyan-50 border-cyan-200', Commission: 'text-pink-600 bg-pink-50 border-pink-200', KYC: 'text-red-600 bg-red-50 border-red-200', Support: 'text-indigo-600 bg-indigo-50 border-indigo-200', Technical: 'text-teal-600 bg-teal-50 border-teal-200', Refunds: 'text-orange-600 bg-orange-50 border-orange-200' }

export default function AdminFaq() {
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const filtered = dummyFaqs.filter(f => !search || f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase()) || f.category.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-extrabold text-heading">FAQ Management</h1><p className="text-sm text-text-secondary mt-0.5">Manage frequently asked questions</p></div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2.5 gradient-bg text-white text-xs font-bold rounded-xl shadow-glow"><Plus className="w-4 h-4" /> Add FAQ</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total FAQs', value: dummyFaqs.length, color: 'from-blue-500 to-blue-600' },
          { label: 'Published', value: dummyFaqs.filter(f => f.status === 'published').length, color: 'from-green-500 to-green-600' },
          { label: 'Drafts', value: dummyFaqs.filter(f => f.status === 'draft').length, color: 'from-amber-500 to-orange-500' },
          { label: 'Categories', value: [...new Set(dummyFaqs.map(f => f.category))].length, color: 'from-purple-500 to-purple-600' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-2`}><HelpCircle className="w-4.5 h-4.5 text-white" /></div>
            <p className="text-xs text-text-tertiary font-medium">{s.label}</p><p className="text-lg font-extrabold text-heading">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" /><input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search FAQs..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" /></div>

      <div className="space-y-2">
        {filtered.map((f, i) => (
          <motion.div key={f.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => setExpanded(expanded === f.id ? null : f.id)}>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${categoryColors[f.category] || ''}`}>{f.category}</span>
              <p className="text-sm font-semibold text-heading flex-1 truncate">{f.question}</p>
              <div className="flex items-center gap-1 shrink-0">
                <button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-text-secondary hover:text-primary" onClick={(e) => { e.stopPropagation() }}><Edit2 className="w-3.5 h-3.5" /></button>
                <button className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-text-secondary hover:text-red-500" onClick={(e) => { e.stopPropagation() }}><Trash2 className="w-3.5 h-3.5" /></button>
                {expanded === f.id ? <ChevronUp className="w-4 h-4 text-text-tertiary" /> : <ChevronDown className="w-4 h-4 text-text-tertiary" />}
              </div>
            </div>
            <AnimatePresence>
              {expanded === f.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="px-4 pb-4 pt-1 border-t border-slate-100">
                    <p className="text-sm text-text-secondary leading-relaxed">{f.answer}</p>
                    <div className="flex items-center gap-2 mt-3"><span className="text-[10px] text-text-tertiary">Order: {f.order}</span><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${f.status === 'published' ? 'text-green-600 bg-green-50 border border-green-200' : 'text-amber-600 bg-amber-50 border border-amber-200'}`}>{f.status}</span></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>{showModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5"><h3 className="text-lg font-bold text-heading">Add FAQ</h3><button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center"><X className="w-4 h-4 text-text-secondary" /></button></div>
            <div className="space-y-3">
              <select className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary"><option>General</option><option>Account</option><option>Payments</option><option>Bookings</option><option>Wallet</option><option>Commission</option><option>KYC</option><option>Support</option><option>Technical</option><option>Refunds</option></select>
              <input placeholder="Question" className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
              <textarea placeholder="Answer" rows="4" className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
            </div>
            <button onClick={() => setShowModal(false)} className="w-full mt-4 py-3 gradient-bg text-white text-sm font-bold rounded-xl shadow-glow">Add FAQ</button>
          </motion.div>
        </motion.div>
      )}</AnimatePresence>
    </div>
  )
}
