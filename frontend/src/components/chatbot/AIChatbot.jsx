import { useState, useRef, useEffect, useCallback, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, X, Minus, Send, Mic, Paperclip,
  Smile, Plane, Hotel, Stamp, ShieldCheck, Package, BookOpen,
  Wallet, Tag, MapPin, Clock, ChevronLeft, MoreVertical, Search,
  Pin, Trash2, Plus, MessageSquare, Star, ArrowRight, Check
} from 'lucide-react'
import { generateResponse, getTimeGreeting, detectIntent } from './aiEngine.js'
import {
  FlightCard, HotelCard, PackageCard, VisaCard, InsuranceCard,
  OfferCard, DestinationCard, TipsCard
} from './ResponseCards.jsx'

// Suggestion chips for welcome screen
const welcomeSuggestions = [
  { label: 'Book Flight', icon: Plane, color: 'text-blue-500' },
  { label: 'Book Hotel', icon: Hotel, color: 'text-purple-500' },
  { label: 'Visa', icon: Stamp, color: 'text-green-500' },
  { label: 'Travel Insurance', icon: ShieldCheck, color: 'text-orange-500' },
  { label: 'Holiday Packages', icon: Package, color: 'text-pink-500' },
  { label: 'Check Booking', icon: BookOpen, color: 'text-cyan-500' },
  { label: 'Wallet Balance', icon: Wallet, color: 'text-emerald-500' },
  { label: 'Latest Offers', icon: Tag, color: 'text-red-500' },
  { label: 'Popular Destinations', icon: MapPin, color: 'text-indigo-500' },
]

// Quick action buttons
const quickActions = [
  { label: 'Flights', icon: Plane },
  { label: 'Hotels', icon: Hotel },
  { label: 'Visa', icon: Stamp },
  { label: 'Insurance', icon: ShieldCheck },
  { label: 'Packages', icon: Package },
  { label: 'Support', icon: MessageSquare },
  { label: 'Bookings', icon: BookOpen },
  { label: 'Wallet', icon: Wallet },
  { label: 'Offers', icon: Tag },
]

const emojis = ['😀', '😍', '🤔', '😎', '🥳', '😴', '🤝', '👍', '✈️', '🏨', '🏖️', '🌍', '🛂', '🛡️', '💰', '🎉', '⭐', '🔥', '💯', '🙏']

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 glass rounded-2xl rounded-tl-sm w-fit">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
          className="w-2 h-2 rounded-full bg-primary"
        />
      ))}
    </div>
  )
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
}

function formatMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>')
}

const MessageBubble = memo(function MessageBubble({ message, onSuggestion, onAction }) {
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10, x: 20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        className="flex justify-end"
      >
        <div className="max-w-[85%]">
          <div className="gradient-bg text-white px-4 py-2.5 rounded-2xl rounded-tr-sm shadow-glow">
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
          <p className="text-[10px] text-text-tertiary text-right mt-1">{formatTime(message.timestamp)}</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, x: -20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      className="flex justify-start"
    >
      <div className="max-w-[90%] w-full">
        <div className="flex items-start gap-2">
          <div className="w-7 h-7 rounded-xl gradient-bg flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="glass-strong border border-white/40 px-4 py-3 rounded-2xl rounded-tl-sm">
              <p className="text-sm text-heading leading-relaxed" dangerouslySetInnerHTML={{ __html: formatMarkdown(message.content) }} />

              {/* Rich response cards */}
              {message.response?.type === 'flight' && message.response.data && (
                <div className="mt-3 space-y-2.5">
                  {message.response.data.map((f, i) => <FlightCard key={i} flight={f} index={i} onAction={onAction} />)}
                </div>
              )}
              {message.response?.type === 'hotel' && message.response.data && (
                <div className="mt-3 space-y-2.5">
                  {message.response.data.map((h, i) => <HotelCard key={i} hotel={h} index={i} onAction={onAction} />)}
                </div>
              )}
              {message.response?.type === 'package' && message.response.data && (
                <div className="mt-3 space-y-2.5">
                  {message.response.data.map((p, i) => <PackageCard key={i} pkg={p} index={i} onAction={onAction} />)}
                </div>
              )}
              {message.response?.type === 'visa' && message.response.data && (
                <div className="mt-3 space-y-2.5">
                  {message.response.data.map((v, i) => <VisaCard key={i} visa={v} index={i} onAction={onAction} />)}
                </div>
              )}
              {message.response?.type === 'insurance' && message.response.data && (
                <div className="mt-3 space-y-2.5">
                  {message.response.data.map((p, i) => <InsuranceCard key={i} plan={p} index={i} onAction={onAction} />)}
                </div>
              )}
              {message.response?.type === 'offers' && message.response.data && (
                <div className="mt-3 space-y-2.5">
                  {message.response.data.map((o, i) => <OfferCard key={i} offer={o} index={i} />)}
                </div>
              )}
              {message.response?.type === 'destinations' && message.response.data && (
                <div className="mt-3 grid grid-cols-2 gap-2.5">
                  {message.response.data.map((d, i) => <DestinationCard key={i} dest={d} index={i} />)}
                </div>
              )}
              {message.response?.type === 'tips' && message.response.data && (
                <div className="mt-3">
                  <TipsCard tips={message.response.data} />
                </div>
              )}

              {/* Action button */}
              {message.response?.action && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onAction?.(message.response.action.route)}
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 gradient-bg text-white text-xs font-bold rounded-xl shadow-glow"
                >
                  {message.response.action.label} <ArrowRight className="w-3 h-3" />
                </motion.button>
              )}

              {/* Suggestion chips */}
              {message.response?.suggestions && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {message.response.suggestions.map((s, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => onSuggestion(s)}
                      className="px-3 py-1.5 text-xs font-medium text-primary bg-primary/10 border border-primary/20 rounded-full hover:bg-primary/20 transition-all"
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
            <p className="text-[10px] text-text-tertiary mt-1 ml-9">{formatTime(message.timestamp)}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
})

function WelcomeScreen({ onSuggestion }) {
  const greeting = getTimeGreeting()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center h-full px-6 py-8 text-center"
    >
      {/* AI Avatar */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="relative mb-4"
      >
        <div className="w-16 h-16 rounded-3xl gradient-bg flex items-center justify-center shadow-glow">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-white"
        />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-extrabold text-heading font-heading"
      >
        {greeting}! {"\u{1F44B}"}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-text-secondary mt-1"
      >
        I'm your AI Travel Assistant
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-4 mb-5"
      >
        <p className="text-xs text-text-tertiary font-semibold uppercase tracking-wide mb-2">I can help you with</p>
        <div className="flex flex-wrap justify-center gap-1.5">
          {['Flights', 'Hotels', 'Visa', 'Insurance', 'Packages', 'Bookings', 'Payments', 'Invoices', 'Support', 'KYC', 'Wallet', 'Reports'].map(s => (
            <span key={s} className="px-2.5 py-1 text-[11px] font-medium text-heading bg-white/40 border border-white/50 rounded-full">
              {s}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Suggestion chips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full"
      >
        <p className="text-xs text-text-tertiary font-semibold uppercase tracking-wide mb-2.5 text-left">Quick Actions</p>
        <div className="grid grid-cols-3 gap-2">
          {welcomeSuggestions.map((s, i) => (
            <motion.button
              key={s.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.05 }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSuggestion(s.label)}
              className="flex flex-col items-center gap-1.5 p-2.5 glass-strong border border-white/40 rounded-2xl hover:shadow-soft transition-all"
            >
              <s.icon className={`w-5 h-5 ${s.color}`} />
              <span className="text-[10px] font-semibold text-heading text-center leading-tight">{s.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

function ChatHeader({ onMinimize, onToggleSidebar, isMobile, onClose }) {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-white/30 bg-gradient-to-r from-[#2563EB]/10 to-[#06B6D4]/10">
      <div className="flex items-center gap-2.5">
        <div className="relative">
          <div className="w-10 h-10 rounded-2xl gradient-bg flex items-center justify-center shadow-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-heading font-heading">Travel Assistant</p>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-green-600 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Online
            </span>
            <span className="text-[10px] text-text-tertiary">·</span>
            <span className="text-[10px] text-text-tertiary flex items-center gap-0.5">
              <Clock className="w-2.5 h-2.5" /> {formatTime(time)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {!isMobile && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleSidebar}
            className="w-8 h-8 rounded-xl hover:bg-white/40 flex items-center justify-center text-text-secondary hover:text-heading transition-all"
          >
            <MessageSquare className="w-4 h-4" />
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onMinimize}
          className="w-8 h-8 rounded-xl hover:bg-white/40 flex items-center justify-center text-text-secondary hover:text-heading transition-all"
        >
          <Minus className="w-4 h-4" />
        </motion.button>
        {isMobile && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-8 h-8 rounded-xl hover:bg-white/40 flex items-center justify-center text-text-secondary hover:text-heading transition-all"
          >
            <X className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </div>
  )
}

function InputArea({ onSend, disabled }) {
  const [input, setInput] = useState('')
  const [showEmoji, setShowEmoji] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const textareaRef = useRef(null)

  const handleSend = () => {
    if (!input.trim() || disabled) return
    onSend(input.trim())
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 100) + 'px'
    }
  }

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return
    if (isListening) {
      setIsListening(false)
      return
    }
    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript
      setInput(prev => prev + transcript)
      setIsListening(false)
    }
    recognition.onerror = () => setIsListening(false)
    recognition.onend = () => setIsListening(false)
    recognition.start()
    setIsListening(true)
  }

  return (
    <div className="border-t border-white/30 p-3 bg-white/20">
      {showEmoji && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="mb-2 p-2 glass-strong rounded-2xl border border-white/40 grid grid-cols-10 gap-1"
        >
          {emojis.map(e => (
            <button
              key={e}
              onClick={() => { setInput(prev => prev + e); setShowEmoji(false) }}
              className="text-lg hover:scale-125 transition-transform p-1"
            >
              {e}
            </button>
          ))}
        </motion.div>
      )}
      <div className="flex items-end gap-2">
        <div className="flex items-center gap-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowEmoji(!showEmoji)}
            className="w-8 h-8 rounded-xl hover:bg-white/40 flex items-center justify-center text-text-secondary hover:text-primary transition-all"
          >
            <Smile className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-xl hover:bg-white/40 flex items-center justify-center text-text-secondary hover:text-primary transition-all"
          >
            <Paperclip className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleVoice}
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${isListening ? 'bg-red-500 text-white' : 'hover:bg-white/40 text-text-secondary hover:text-primary'}`}
          >
            <Mic className="w-4 h-4" />
          </motion.button>
        </div>
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => { setInput(e.target.value); autoResize() }}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about your travel..."
            rows={1}
            className="w-full px-4 py-2.5 text-sm bg-white/50 border border-white/50 rounded-2xl text-heading placeholder:text-text-tertiary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none transition-all"
            style={{ maxHeight: '100px' }}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={!input.trim() || disabled}
          className="w-9 h-9 rounded-xl gradient-bg text-white flex items-center justify-center shadow-glow disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </div>
      <div className="flex items-center justify-between mt-1.5 px-1">
        <p className="text-[10px] text-text-tertiary">{input.length}/500</p>
        <p className="text-[10px] text-text-tertiary">Press Enter to send</p>
      </div>
    </div>
  )
}

function QuickActionBar({ onAction }) {
  return (
    <div className="px-3 py-2 border-b border-white/20 overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-1.5 min-w-max">
        {quickActions.map(a => (
          <motion.button
            key={a.label}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onAction(a.label)}
            className="flex items-center gap-1.5 px-3 py-1.5 glass border border-white/40 rounded-full text-xs font-medium text-heading hover:bg-white/60 transition-all shrink-0"
          >
            <a.icon className="w-3.5 h-3.5 text-primary" />
            {a.label}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

function ConversationSidebar({ conversations, activeId, onSelect, onNew, onClose, isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="absolute left-full top-0 bottom-0 w-64 glass-strong border-l border-white/40 z-50 flex flex-col shadow-floating"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/30">
            <p className="text-sm font-bold text-heading">History</p>
            <button onClick={onClose} className="w-7 h-7 rounded-lg hover:bg-white/40 flex items-center justify-center text-text-secondary">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {conversations.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-8 h-8 text-text-tertiary mx-auto mb-2" />
                <p className="text-xs text-text-tertiary">No conversations yet</p>
              </div>
            ) : (
              conversations.map(c => (
                <button
                  key={c.id}
                  onClick={() => onSelect(c.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl transition-all ${activeId === c.id ? 'bg-primary/10 border border-primary/20' : 'hover:bg-white/40 border border-transparent'}`}
                >
                  <p className="text-xs font-semibold text-heading truncate">{c.title}</p>
                  <p className="text-[10px] text-text-tertiary mt-0.5">{c.messageCount} messages · {formatTime(c.timestamp)}</p>
                </button>
              ))
            )}
          </div>
          <div className="p-2 border-t border-white/30">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onNew}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 gradient-bg text-white text-xs font-bold rounded-xl shadow-glow"
            >
              <Plus className="w-4 h-4" /> New Chat
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function AIChatbot() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [hasAutoOpened, setHasAutoOpened] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [conversations, setConversations] = useState([])
  const [activeConvId, setActiveConvId] = useState(null)
  const messagesEndRef = useRef(null)
  const messagesContainerRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-open on first visit with pop animation
  useEffect(() => {
    if (!hasAutoOpened) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        setHasAutoOpened(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [hasAutoOpened])

  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  const handleSend = useCallback(async (text) => {
    const userMsg = { role: 'user', content: text, timestamp: new Date().toISOString() }
    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)

    // Simulate AI thinking time
    const thinkingTime = 600 + Math.random() * 800
    setTimeout(() => {
      const response = generateResponse(text, messages)
      const aiMsg = {
        role: 'assistant',
        content: response.text,
        response,
        timestamp: new Date().toISOString(),
      }
      setMessages(prev => [...prev, aiMsg])
      setIsTyping(false)
    }, thinkingTime)
  }, [messages])

  const handleSuggestion = useCallback((suggestion) => {
    handleSend(suggestion)
  }, [handleSend])

  const handleAction = useCallback((route) => {
    if (route) navigate(route)
  }, [navigate])

  const handleNewChat = useCallback(() => {
    if (messages.length > 0) {
      const title = messages[0].content.substring(0, 30)
      const newConv = {
        id: Date.now(),
        title,
        messageCount: messages.length,
        timestamp: new Date().toISOString(),
        messages,
      }
      setConversations(prev => [newConv, ...prev])
    }
    setMessages([])
    setActiveConvId(null)
    setShowSidebar(false)
  }, [messages])

  const handleSelectConversation = useCallback((id) => {
    const conv = conversations.find(c => c.id === id)
    if (conv) {
      setMessages(conv.messages || [])
      setActiveConvId(id)
      setShowSidebar(false)
    }
  }, [conversations])

  const chatWidth = isMobile ? 'calc(100vw - 1.5rem)' : '420px'
  const chatHeight = isMobile ? 'calc(100vh - 5rem)' : '720px'

  return (
    <AnimatePresence mode="wait">
      {/* ── Floating Action Button ── */}
      {!isOpen && (
        <motion.div
          key="fab"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="fixed bottom-6 left-6 z-[9999]"
        >
          {/* Tooltip label */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-2 px-3.5 py-2 glass-strong rounded-2xl shadow-floating border border-white/40 whitespace-nowrap pointer-events-none"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-heading">AI Assistant</span>
            <span className="text-[10px] text-text-secondary">· Online</span>
          </motion.div>

          {/* Pulse ring */}
          <motion.div
            animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-0 rounded-3xl gradient-bg"
          />
          <motion.div
            animate={{ scale: [1, 1.6], opacity: [0.3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
            className="absolute inset-0 rounded-3xl gradient-bg"
          />

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.75 }}
            onClick={() => { setIsOpen(true); setIsMinimized(false) }}
            className="relative w-16 h-16 rounded-3xl gradient-bg shadow-floating flex items-center justify-center group"
            aria-label="Open AI Travel Assistant"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent" />
            <Sparkles className="w-7 h-7 text-white relative z-10 drop-shadow-lg" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-500 border-2 border-white z-10" />
          </motion.button>
        </motion.div>
      )}

      {/* ── Minimized Bar ── */}
      {isOpen && isMinimized && (
        <motion.div
          key="minimized"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={`fixed bottom-6 left-6 z-[9999] glass-strong rounded-2xl shadow-floating border border-white/40 ${isMobile ? 'w-[calc(100vw-3rem)]' : 'w-80'}`}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-glow">
                  <Sparkles className="w-4.5 h-4.5 text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-heading">Travel Assistant</p>
                <p className="text-[10px] text-green-600">Online · Tap to expand</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMinimized(false)}
                className="w-8 h-8 rounded-xl hover:bg-white/40 flex items-center justify-center text-text-secondary"
              >
                <Plus className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-xl hover:bg-white/40 flex items-center justify-center text-text-secondary"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Full Chat Window ── */}
      {isOpen && !isMinimized && (
        <motion.div
          key="chat"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22, mass: 0.8 }}
          style={{ width: chatWidth, height: chatHeight, maxWidth: '100vw', maxHeight: '100vh', transformOrigin: 'bottom left' }}
          className="fixed bottom-6 left-6 z-[9999] glass-strong rounded-[32px] shadow-floating border border-white/40 flex flex-col overflow-hidden"
        >
          {/* Mobile backdrop */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998]"
            />
          )}

          <ChatHeader
            onMinimize={() => setIsMinimized(true)}
            onToggleSidebar={() => setShowSidebar(!showSidebar)}
            isMobile={isMobile}
            onClose={() => setIsOpen(false)}
          />

          <QuickActionBar onAction={handleSuggestion} />

          {/* Messages area */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
          >
            {messages.length === 0 ? (
              <WelcomeScreen onSuggestion={handleSuggestion} />
            ) : (
              <>
                {messages.map((msg, i) => (
                  <MessageBubble
                    key={i}
                    message={msg}
                    onSuggestion={handleSuggestion}
                    onAction={handleAction}
                  />
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2"
                  >
                    <div className="w-7 h-7 rounded-xl gradient-bg flex items-center justify-center shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <TypingIndicator />
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          <InputArea onSend={handleSend} disabled={isTyping} />

          <ConversationSidebar
            conversations={conversations}
            activeId={activeConvId}
            onSelect={handleSelectConversation}
            onNew={handleNewChat}
            onClose={() => setShowSidebar(false)}
            isOpen={showSidebar}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
