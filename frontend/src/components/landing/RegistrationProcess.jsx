import { useState } from 'react'
import { motion } from 'framer-motion'
import { Smartphone, FileText, FileCheck, BadgeCheck, ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import AuthModal from '../AuthModal.jsx'

const steps = [
  { icon: Smartphone, title: 'Enter Phone & OTP', desc: 'Enter your phone number and submit the OTP received.' },
  { icon: FileText, title: 'Personal Info & PAN', desc: 'Fill in your personal information and upload your PAN card.' },
  { icon: FileCheck, title: 'Upload KYC Documents', desc: 'Upload your KYC documents (electricity bill, bank statement or business registration certificate).' },
  { icon: BadgeCheck, title: 'Complete Registration', desc: "Complete your registration by accepting the T&Cs and creating a strong password. You're ready to grow your business!" },
]

export default function RegistrationProcess() {
  const [authOpen, setAuthOpen] = useState(false)
  return (
    <section id="steps" className="py-20 lg:py-28">
      <div className="container-max section-padding">
        <SectionHeading
          eyebrow="Registration Process"
          title="Steps to Apply in myPartner"
          subtitle="The myPartner signup is as easy as it can get. You just need to follow the below simple steps and you're done!"
        />

        <div className="mt-16 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="bg-card rounded-card border border-border/60 p-6 text-center hover:shadow-floating transition-all duration-300 h-full">
                  {/* Step number */}
                  <div className="relative inline-flex mb-4">
                    <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center shadow-glow">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-heading text-white text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-bold text-heading text-sm mb-2">{step.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{step.desc}</p>
                </div>

                {/* Arrow connector for desktop */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-12 -right-3 w-6 h-6 items-center justify-center text-border z-10">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8H14M14 8L9 3M14 8L9 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button onClick={() => setAuthOpen(true)} size="lg" className="shadow-glow">
            Sign Up Now
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialMode="login" />
    </section>
  )
}
