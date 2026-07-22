import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FileCheck, Upload, CheckCircle2, Clock, AlertCircle, Shield,
  IdCard, Building2, Stamp, FileText, ArrowRight, X, Camera
} from 'lucide-react'
import PremiumBadge from '../../components/ui/PremiumBadge.jsx'
import AnimatedBlobs from '../../components/ui/AnimatedBlobs.jsx'

const steps = [
  { key: 'pan', label: 'PAN Card', icon: IdCard, desc: 'Verify your PAN card for tax compliance' },
  { key: 'gst', label: 'GST Certificate', icon: Building2, desc: 'Upload your GST registration certificate' },
  { key: 'address', label: 'Address Proof', icon: FileText, desc: 'Utility bill or rental agreement' },
  { key: 'photo', label: 'Agency Photo', icon: Camera, desc: 'Photo of your office/shop front' },
]

export default function KycPage() {
  const navigate = useNavigate()
  const [uploaded, setUploaded] = useState({ pan: false, gst: false, address: false, photo: false })
  const [status] = useState('in_progress')

  return (
    <div className="relative p-4 sm:p-6 lg:p-8 space-y-6 gradient-mesh min-h-screen">
      <AnimatedBlobs />

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
        <h1 className="text-2xl lg:text-3xl font-extrabold text-heading font-heading">KYC Verification</h1>
        <p className="text-text-secondary mt-1">Complete your verification to unlock all features</p>
      </motion.div>

      {/* Status Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative glass-strong rounded-card p-6 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0">
            <Clock className="w-7 h-7 text-amber-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-heading font-heading font-heading">Verification In Progress</h3>
            <p className="text-sm text-text-secondary">2 of 4 documents verified. Estimated completion: 2-3 business days.</p>
          </div>
        </div>
        <PremiumBadge variant="warning" icon={Clock}>PENDING</PremiumBadge>
      </motion.div>

      {/* Progress Ring + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-strong rounded-card p-6 shadow-card flex flex-col items-center justify-center"
        >
          <ProgressRing percent={50} />
          <p className="text-sm text-text-secondary mt-3 text-center">2 of 4 documents verified</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-strong rounded-card p-6 shadow-card"
        >
          <h3 className="text-lg font-bold text-heading font-heading font-heading mb-5">Verification Checklist</h3>
          <div className="space-y-3">
            {steps.map((step, i) => {
              const isUploaded = uploaded[step.key]
              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/40 border border-white/50"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isUploaded ? 'bg-emerald-50' : 'bg-slate-100'}`}>
                    {isUploaded ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <step.icon className="w-5 h-5 text-text-secondary" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-heading">{step.label}</p>
                    <p className="text-xs text-text-secondary">{step.desc}</p>
                  </div>
                  {isUploaded ? (
                    <PremiumBadge variant="success">VERIFIED</PremiumBadge>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setUploaded(prev => ({ ...prev, [step.key]: true }))}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl gradient-bg text-white text-xs font-semibold shadow-soft"
                    >
                      <Upload className="w-3.5 h-3.5" /> Upload
                    </motion.button>
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Shield, title: 'Bank-grade Security', desc: 'Your documents are encrypted and stored securely', color: 'bg-primary/10 text-primary', to: '/app/profile' },
          { icon: CheckCircle2, title: 'Quick Approval', desc: 'Documents reviewed within 2-3 business days', color: 'bg-emerald-50 text-emerald-600', to: '/app/support' },
          { icon: AlertCircle, title: 'Need Help?', desc: 'Contact support if you face any issues uploading', color: 'bg-amber-50 text-amber-600', to: '/app/support' },
        ].map((info, i) => (
          <motion.div
            key={info.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            onClick={() => navigate(info.to)}
            className="glass-strong rounded-card p-5 shadow-card cursor-pointer"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${info.color}`}>
              <info.icon className="w-5 h-5" />
            </div>
            <p className="text-sm font-bold text-heading font-heading">{info.title}</p>
            <p className="text-xs text-text-secondary mt-1">{info.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ProgressRing({ percent }) {
  const circumference = 2 * Math.PI * 52
  const offset = circumference - (percent / 100) * circumference
  return (
    <div className="relative w-40 h-40">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="52" fill="none" stroke="#E2E8F0" strokeWidth="10" />
        <motion.circle
          cx="60" cy="60" r="52" fill="none" stroke="url(#kycGrad)" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="kycGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-3xl font-extrabold text-heading font-heading">{percent}%</p>
        <p className="text-xs text-text-secondary mt-1">Complete</p>
      </div>
    </div>
  )
}
