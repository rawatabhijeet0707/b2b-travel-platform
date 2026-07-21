// AI Travel Assistant - Intent Detection & Response Engine

export const intents = {
  FLIGHT_SEARCH: 'flight_search',
  HOTEL_SEARCH: 'hotel_search',
  VISA_INFO: 'visa_info',
  INSURANCE: 'insurance',
  PACKAGES: 'packages',
  BOOKINGS: 'bookings',
  WALLET: 'wallet',
  PAYMENTS: 'payments',
  INVOICES: 'invoices',
  SUPPORT: 'support',
  KYC: 'kyc',
  REPORTS: 'reports',
  GREETING: 'greeting',
  OFFERS: 'offers',
  DESTINATIONS: 'destinations',
  WEATHER: 'weather',
  TRAVEL_TIPS: 'travel_tips',
  HELP: 'help',
  UNKNOWN: 'unknown',
}

const patterns = [
  { intent: intents.FLIGHT_SEARCH, regex: /\b(flight|fly|air|airline|delhi to|dubai to|mumbai to|bangalore to|book.*flight|flight.*book|air.*ticket)\b/i },
  { intent: intents.HOTEL_SEARCH, regex: /\b(hotel|stay|accommodation|resort|room|lodging|guest house|hotels in|stay in)\b/i },
  { intent: intents.VISA_INFO, regex: /\b(visa|e-visa|evisa|passport|immigration|visa for|visa application)\b/i },
  { intent: intents.INSURANCE, regex: /\b(insurance|travel insurance|coverage|policy|claim|shield|protection)\b/i },
  { intent: intents.PACKAGES, regex: /\b(package|holiday|tour|vacation|trip|getaway|itinerary|honeymoon)\b/i },
  { intent: intents.BOOKINGS, regex: /\b(booking|bookings|reservation|my booking|booking status|check booking)\b/i },
  { intent: intents.WALLET, regex: /\b(wallet|balance|funds|money|credit|top.?up|cashback)\b/i },
  { intent: intents.PAYMENTS, regex: /\b(payment|payments|paid|transaction|deposit|transfer)\b/i },
  { intent: intents.INVOICES, regex: /\b(invoice|invoices|bill|receipt|gst|tax invoice)\b/i },
  { intent: intents.SUPPORT, regex: /\b(support|help desk|ticket|complaint|issue|problem|contact|customer care)\b/i },
  { intent: intents.KYC, regex: /\b(kyc|verify|verification|documents|pan|gst|aadhaar|identity)\b/i },
  { intent: intents.REPORTS, regex: /\b(report|reports|analytics|stats|statistics|performance|sales|revenue)\b/i },
  { intent: intents.OFFERS, regex: /\b(offer|offers|deal|deals|discount|promo|coupon|cashback|save)\b/i },
  { intent: intents.DESTINATIONS, regex: /\b(destination|destinations|popular|where to go|places to visit|explore)\b/i },
  { intent: intents.WEATHER, regex: /\b(weather|temperature|climate|rain|sunny|hot|cold|season)\b/i },
  { intent: intents.TRAVEL_TIPS, regex: /\b(tip|tips|advice|guide|packing|checklist|travel tip)\b/i },
  { intent: intents.GREETING, regex: /\b(hi|hello|hey|good morning|good afternoon|good evening|namaste|greetings)\b/i },
  { intent: intents.HELP, regex: /\b(help|what can you do|how to|guide me|assist)\b/i },
]

export function detectIntent(message) {
  for (const { intent, regex } of patterns) {
    if (regex.test(message)) return intent
  }
  return intents.UNKNOWN
}

// Extract route info from message (e.g., "Delhi to Dubai")
export function extractRoute(message) {
  const match = message.match(/(\w+)\s+to\s+(\w+)/i)
  if (match) return { from: match[1], to: match[2] }
  return null
}

// Extract destination from message (e.g., "Hotels in Goa")
export function extractDestination(message) {
  const match = message.match(/(?:in|for|to|visit)\s+(\w+)/i)
  if (match) return match[1]
  return null
}

export function getTimeGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  return 'Good Evening'
}

// Sample data for rich responses
export const sampleFlights = [
  { airline: 'Emirates', logo: 'EK', from: 'DEL', to: 'DXB', depart: '08:30', arrive: '11:00', duration: '3h 30m', stops: 'Non-stop', price: 18999, refundable: true, meal: true, baggage: '30kg', rating: 4.8 },
  { airline: 'Qatar Airways', logo: 'QR', from: 'DEL', to: 'DXB', depart: '14:15', arrive: '16:45', duration: '3h 30m', stops: 'Non-stop', price: 22500, refundable: true, meal: true, baggage: '35kg', rating: 4.9 },
  { airline: 'Air India', logo: 'AI', from: 'DEL', to: 'DXB', depart: '19:45', arrive: '22:15', duration: '3h 30m', stops: 'Non-stop', price: 15499, refundable: false, meal: true, baggage: '25kg', rating: 4.5 },
  { airline: 'IndiGo', logo: '6E', from: 'DEL', to: 'DXB', depart: '06:00', arrive: '08:30', duration: '3h 30m', stops: 'Non-stop', price: 12999, refundable: false, meal: false, baggage: '20kg', rating: 4.3 },
]

export const sampleHotels = [
  { name: 'The Grand Palace Hotel', location: 'Goa, India', rating: 4.8, reviews: 1240, price: 4500, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80', amenities: ['WiFi', 'Pool', 'Spa', 'Gym'], tag: 'Luxury' },
  { name: 'Beachside Resort', location: 'Goa, India', rating: 4.6, reviews: 890, price: 3200, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80', amenities: ['WiFi', 'Beach', 'Bar', 'Restaurant'], tag: 'Beachfront' },
  { name: 'Boutique Heritage Stay', location: 'Goa, India', rating: 4.5, reviews: 567, price: 2800, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80', amenities: ['WiFi', 'Restaurant', 'Cultural Tours'], tag: 'Heritage' },
]

export const samplePackages = [
  { title: 'Dubai Deluxe 5N/6D', destination: 'Dubai, UAE', nights: 5, price: 49999, rating: 4.8, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80', highlights: ['Burj Khalifa', 'Desert Safari', 'Dhow Cruise', 'City Tour'], tag: 'Best Seller' },
  { title: 'Maldives Paradise 4N/5D', destination: 'Maldives', nights: 4, price: 79999, rating: 4.9, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80', highlights: ['Overwater Villa', 'Snorkeling', 'Spa', 'All Meals'], tag: 'Premium' },
  { title: 'Goa Beach Party 3N/4D', destination: 'Goa, India', nights: 3, price: 18999, rating: 4.6, image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7d2?w=400&q=80', highlights: ['Beach Resort', 'Water Sports', 'Casino', 'Nightlife'], tag: 'Popular' },
]

export const sampleVisas = [
  { country: 'Thailand', flag: '\u{1F1F9}\u{1F1ED}', type: 'e-Visa', valid: '90 days', fee: 1500, processing: '3-5 Days', popular: true },
  { country: 'UAE', flag: '\u{1F1E6}\u{1F1EA}', type: 'e-Visa', valid: '60 days', fee: 5500, processing: '3-5 Days', popular: true },
  { country: 'Singapore', flag: '\u{1F1F8}\u{1F1EC}', type: 'e-Visa', valid: '30 days', fee: 1800, processing: '3-5 Days', popular: false },
  { country: 'Maldives', flag: '\u{1F1F2}\u{1F1FB}', type: 'e-Visa', valid: '30 days', fee: 3500, processing: '5-7 Days', popular: true },
]

export const sampleInsurance = [
  { name: 'Basic Travel Shield', provider: 'TATA AIG', price: 199, duration: '7 Days', coverage: 150000, features: ['Medical emergencies', 'Trip cancellation', 'Baggage loss'], color: 'from-blue-400 to-cyan-500' },
  { name: 'Premium Travel Guard', provider: 'ICICI Lombard', price: 499, duration: '15 Days', coverage: 500000, features: ['Medical emergencies', 'Trip cancellation', 'Baggage loss', 'Flight delay', 'Adventure sports'], color: 'from-purple-400 to-pink-500' },
  { name: 'Comprehensive Cover', provider: 'Bajaj Allianz', price: 899, duration: '30 Days', coverage: 1000000, features: ['Medical emergencies', 'Trip cancellation', 'Baggage loss', 'Flight delay', 'Adventure sports', 'COVID cover', 'Emergency evacuation'], color: 'from-amber-400 to-orange-500' },
]

export const popularDestinations = [
  { name: 'Dubai', country: 'UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=300&q=80', bestSeason: 'Nov - Mar', avgPrice: 35000 },
  { name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&q=80', bestSeason: 'Apr - Oct', avgPrice: 28000 },
  { name: 'Singapore', country: 'Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=300&q=80', bestSeason: 'Feb - Apr', avgPrice: 32000 },
  { name: 'Goa', country: 'India', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7d2?w=300&q=80', bestSeason: 'Nov - Feb', avgPrice: 12000 },
]

export const travelTips = [
  'Always carry a copy of your passport and visa documents separately from the originals.',
  'Book flights 6-8 weeks in advance for the best fares on international routes.',
  'Check baggage allowance before packing to avoid excess baggage fees at the airport.',
  'Buy travel insurance that covers medical emergencies, especially for international trips.',
  'Keep local currency handy for small expenses at your destination.',
  'Download offline maps of your destination before you travel.',
]

export const offers = [
  { title: 'Flat 15% off on Dubai Flights', code: 'DUBAI15', valid: 'Until Mar 31', desc: 'Save up to ₹5,000 on flights to Dubai' },
  { title: 'Maldives Package - Early Bird', code: 'MALDIVES20', valid: 'Until Feb 28', desc: '20% off on 4N/5D Maldives packages' },
  { title: 'Free Travel Insurance', code: 'INSUREFREE', valid: 'Until Apr 15', desc: 'Complimentary insurance on bookings above ₹50,000' },
]

// Generate AI response based on intent
export function generateResponse(message, context = []) {
  const intent = detectIntent(message)
  const route = extractRoute(message)
  const destination = extractDestination(message)

  switch (intent) {
    case intents.FLIGHT_SEARCH:
      return {
        type: 'flight',
        text: route
          ? `Here are the best flight options from ${route.from} to ${route.to}. I found ${sampleFlights.length} flights for you:`
          : `Here are some popular flight options I found for you:`,
        data: sampleFlights,
        suggestions: ['Cheapest flight', 'Non-stop only', 'Book now', 'Check baggage'],
      }

    case intents.HOTEL_SEARCH:
      return {
        type: 'hotel',
        text: destination
          ? `Here are the top-rated hotels in ${destination}:`
          : `Here are some popular hotels I recommend:`,
        data: sampleHotels,
        suggestions: ['Budget hotels', '5-star only', 'Beachfront', 'Family friendly'],
      }

    case intents.VISA_INFO:
      return {
        type: 'visa',
        text: `Here's visa information for popular destinations. Processing times and fees may vary:`,
        data: sampleVisas,
        suggestions: ['Visa for UAE', 'Visa for Thailand', 'Visa for Singapore', 'Documents required'],
      }

    case intents.INSURANCE:
      return {
        type: 'insurance',
        text: `Here are the best travel insurance plans I found for you:`,
        data: sampleInsurance,
        suggestions: ['Basic coverage', 'Premium plan', 'Compare all', 'Adventure sports cover'],
      }

    case intents.PACKAGES:
      return {
        type: 'package',
        text: `Check out these amazing holiday packages:`,
        data: samplePackages,
        suggestions: ['Dubai packages', 'Maldives packages', 'Honeymoon specials', 'Budget trips'],
      }

    case intents.BOOKINGS:
      return {
        type: 'text',
        text: `I can help you check your bookings! You can view all your bookings in the Bookings section. Would you like me to take you there?`,
        suggestions: ['View all bookings', 'Check booking status', 'Cancel booking', 'Modify booking'],
        action: { label: 'Go to Bookings', route: '/app/bookings' },
      }

    case intents.WALLET:
      return {
        type: 'text',
        text: `Your wallet balance is ₹2,48,500. You also have 45,200 reward points available. Would you like to:`,
        suggestions: ['Add money', 'View transactions', 'Redeem points', 'Wallet history'],
        action: { label: 'Open Wallet', route: '/app/wallet' },
      }

    case intents.PAYMENTS:
      return {
        type: 'text',
        text: `You can view all your payment transactions in the Payments section. This includes successful, pending, and failed transactions.`,
        suggestions: ['View payments', 'Download statement', 'Payment methods', 'Failed transactions'],
        action: { label: 'Go to Payments', route: '/app/payments' },
      }

    case intents.INVOICES:
      return {
        type: 'text',
        text: `All your GST invoices and billing receipts are available in the Invoices section. You can download them anytime.`,
        suggestions: ['View invoices', 'Download GST invoice', 'This month invoices', 'Search invoice'],
        action: { label: 'Go to Invoices', route: '/app/invoices' },
      }

    case intents.SUPPORT:
      return {
        type: 'text',
        text: `I'm here to help! You can raise a support ticket and our team will get back to you within 24 hours. What issue are you facing?`,
        suggestions: ['Raise a ticket', 'Track my ticket', 'FAQs', 'Talk to agent'],
        action: { label: 'Go to Support', route: '/app/support' },
      }

    case intents.KYC:
      return {
        type: 'text',
        text: `Your KYC status is **Verified** ✓. Your PAN, GST, and business documents are all verified. You can manage them in the KYC section.`,
        suggestions: ['View KYC details', 'Update documents', 'KYC status', 'Upload new document'],
        action: { label: 'Go to KYC', route: '/app/kyc' },
      }

    case intents.REPORTS:
      return {
        type: 'text',
        text: `Your business performance is looking great! This month you've made 142 bookings with ₹26,98,858 in revenue. Would you like to see detailed reports?`,
        suggestions: ['View full report', 'Revenue breakdown', 'Top routes', 'Monthly comparison'],
        action: { label: 'Go to Reports', route: '/app/reports' },
      }

    case intents.OFFERS:
      return {
        type: 'offers',
        text: `Here are the latest offers and deals available for you:`,
        data: offers,
        suggestions: ['More offers', 'Apply promo code', 'Exclusive deals', 'Seasonal discounts'],
      }

    case intents.DESTINATIONS:
      return {
        type: 'destinations',
        text: `Here are some popular destinations trending right now:`,
        data: popularDestinations,
        suggestions: ['Beach destinations', 'Mountain getaways', 'City breaks', 'Honeymoon spots'],
      }

    case intents.WEATHER:
      return {
        type: 'text',
        text: `I can help you with weather information! The best time to visit most destinations is during their dry season. For example:\n\n• **Dubai**: Nov - Mar (Pleasant, 20-30°C)\n• **Goa**: Nov - Feb (Sunny, 20-32°C)\n• **Bali**: Apr - Oct (Dry, 25-32°C)\n• **Singapore**: Feb - Apr (Less humid, 25-33°C)`,
        suggestions: ['Weather in Dubai', 'Weather in Goa', 'Best season to travel', 'Monsoon travel tips'],
      }

    case intents.TRAVEL_TIPS:
      return {
        type: 'tips',
        text: `Here are some essential travel tips for your next trip:`,
        data: travelTips,
        suggestions: ['Packing tips', 'Safety tips', 'Budget travel', 'International travel'],
      }

    case intents.GREETING:
      return {
        type: 'text',
        text: `${getTimeGreeting()}! 👋 I'm your AI Travel Assistant. How can I help you today? I can assist with flights, hotels, visa, insurance, packages, bookings, and more!`,
        suggestions: ['Book a flight', 'Find hotels', 'Visa information', 'Holiday packages'],
      }

    case intents.HELP:
      return {
        type: 'text',
        text: `I can help you with a wide range of travel services:\n\n✈️ **Flights** - Search & book flights\n🏨 **Hotels** - Find best hotel deals\n🛂 **Visa** - Visa information & requirements\n🛡️ **Insurance** - Travel insurance plans\n📦 **Packages** - Holiday packages & tours\n📋 **Bookings** - Check & manage bookings\n💰 **Wallet** - Balance & transactions\n📊 **Reports** - Business analytics\n🎫 **Support** - Get help & raise tickets\n\nJust type what you need!`,
        suggestions: ['Book a flight', 'Find hotels', 'Check my wallet', 'View offers'],
      }

    default:
      return {
        type: 'text',
        text: `I understand you're asking about "${message}". I can help you with flights, hotels, visa, insurance, holiday packages, bookings, wallet, payments, invoices, reports, and support. Could you be more specific about what you need?`,
        suggestions: ['Book a flight', 'Find hotels', 'Visa information', 'Holiday packages'],
      }
  }
}
