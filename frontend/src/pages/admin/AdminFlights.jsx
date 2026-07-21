import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plane, Plus, Search, Edit2, Trash2, Star, TrendingUp, DollarSign } from 'lucide-react'

const dummyFlights = [
  { id: 1, airline: 'Emirates', code: 'EK', route: 'DEL → DXB', flightNo: 'EK517', departure: '08:30', arrival: '10:45', duration: '3h 15m', stops: 0, price: 18999, commission: 950, refundable: true, meal: true, baggage: '30kg', status: 'active', bookings: 342, rating: 4.8 },
  { id: 2, airline: 'Singapore Airlines', code: 'SQ', route: 'BOM → SIN', flightNo: 'SQ421', departure: '23:15', arrival: '07:10', duration: '5h 25m', stops: 0, price: 22500, commission: 1125, refundable: true, meal: true, baggage: '30kg', status: 'active', bookings: 256, rating: 4.9 },
  { id: 3, airline: 'Qatar Airways', code: 'QR', route: 'DEL → DOH', flightNo: 'QR571', departure: '04:00', arrival: '05:35', duration: '4h 05m', stops: 0, price: 16500, commission: 825, refundable: true, meal: true, baggage: '30kg', status: 'active', bookings: 289, rating: 4.7 },
  { id: 4, airline: 'IndiGo', code: '6E', route: 'DEL → GOI', flightNo: '6E-381', departure: '06:00', arrival: '07:45', duration: '2h 45m', stops: 0, price: 5499, commission: 275, refundable: false, meal: false, baggage: '15kg', status: 'active', bookings: 512, rating: 4.2 },
  { id: 5, airline: 'Air India', code: 'AI', route: 'BLR → BKK', flightNo: 'AI332', departure: '11:20', arrival: '16:05', duration: '4h 15m', stops: 0, price: 12800, commission: 640, refundable: true, meal: true, baggage: '25kg', status: 'active', bookings: 198, rating: 4.3 },
  { id: 6, airline: 'Thai Airways', code: 'TG', route: 'MAA → BKK', flightNo: 'TG338', departure: '01:15', arrival: '06:05', duration: '3h 20m', stops: 0, price: 11200, commission: 560, refundable: true, meal: true, baggage: '30kg', status: 'active', bookings: 167, rating: 4.5 },
  { id: 7, airline: 'Etihad Airways', code: 'EY', route: 'DEL → AUH', flightNo: 'EY223', departure: '09:45', arrival: '11:30', duration: '3h 15m', stops: 0, price: 17200, commission: 860, refundable: true, meal: true, baggage: '30kg', status: 'active', bookings: 234, rating: 4.6 },
  { id: 8, airline: 'Malaysia Airlines', code: 'MH', route: 'HYD → KUL', flightNo: 'MH199', departure: '00:30', arrival: '07:15', duration: '4h 15m', stops: 0, price: 13900, commission: 695, refundable: false, meal: true, baggage: '25kg', status: 'inactive', bookings: 89, rating: 4.1 },
]

const airlineColors = { EK: '#D71921', SQ: '#F99F1C', QR: '#5C068C', '6E': '#0066B3', AI: '#ED1C24', TG: '#711719', EY: '#BD8B13', MH: '#0033A0' }

export default function AdminFlights() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filtered = dummyFlights.filter(f => {
    if (search && !f.airline.toLowerCase().includes(search.toLowerCase()) && !f.route.toLowerCase().includes(search.toLowerCase()) && !f.flightNo.toLowerCase().includes(search.toLowerCase())) return false
    if (statusFilter && f.status !== statusFilter) return false
    return true
  })

  const totalBookings = dummyFlights.reduce((s, f) => s + f.bookings, 0)
  const totalRevenue = dummyFlights.reduce((s, f) => s + f.bookings * f.price, 0)
  const totalCommission = dummyFlights.reduce((s, f) => s + f.bookings * f.commission, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-heading">Flights Management</h1>
          <p className="text-sm text-text-secondary mt-0.5">Manage airlines, routes, and pricing</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 gradient-bg text-white text-xs font-bold rounded-xl shadow-glow">
          <Plus className="w-4 h-4" /> Add Flight Route
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Routes', value: dummyFlights.length, icon: Plane, color: 'from-blue-500 to-blue-600' },
          { label: 'Total Bookings', value: totalBookings.toLocaleString(), icon: TrendingUp, color: 'from-green-500 to-green-600' },
          { label: 'Total Revenue', value: `\u20B9${(totalRevenue / 100000).toFixed(1)}L`, icon: DollarSign, color: 'from-purple-500 to-purple-600' },
          { label: 'Commission Earned', value: `\u20B9${(totalCommission / 100000).toFixed(1)}L`, icon: Star, color: 'from-amber-500 to-orange-500' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-2`}><s.icon className="w-4.5 h-4.5 text-white" /></div>
            <p className="text-xs text-text-tertiary font-medium">{s.label}</p>
            <p className="text-lg font-extrabold text-heading">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search airline, route, or flight number..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
          <option value="">All Status</option><option value="active">Active</option><option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((f, i) => (
          <motion.div key={f.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} whileHover={{ y: -2 }} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: airlineColors[f.code] || '#2563EB' }}>{f.code}</div>
                <div>
                  <p className="text-sm font-bold text-heading">{f.airline}</p>
                  <p className="text-xs text-text-tertiary">{f.flightNo}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-text-secondary hover:text-primary"><Edit2 className="w-3.5 h-3.5" /></button>
                <button className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-text-secondary hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
              <div className="text-center"><p className="text-lg font-extrabold text-heading">{f.departure}</p><p className="text-[10px] text-text-tertiary">{f.route.split(' → ')[0]}</p></div>
              <div className="flex-1 mx-2"><div className="h-0.5 bg-slate-200 relative"><Plane className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary" /></div><p className="text-[10px] text-text-tertiary text-center mt-1">{f.duration}</p></div>
              <div className="text-center"><p className="text-lg font-extrabold text-heading">{f.arrival}</p><p className="text-[10px] text-text-tertiary">{f.route.split(' → ')[1]}</p></div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${f.refundable ? 'text-green-600 bg-green-50 border border-green-200' : 'text-red-600 bg-red-50 border border-red-200'}`}>{f.refundable ? 'Refundable' : 'Non-Refundable'}</span>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${f.meal ? 'text-blue-600 bg-blue-50 border border-blue-200' : 'text-text-tertiary bg-slate-50 border border-slate-200'}`}>{f.meal ? 'Meal Included' : 'No Meal'}</span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full text-purple-600 bg-purple-50 border border-purple-200">{f.stops === 0 ? 'Non-Stop' : `${f.stops} Stop`}</span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full text-amber-600 bg-amber-50 border border-amber-200">{f.baggage}</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-text-tertiary">Price</p>
                <p className="text-lg font-extrabold text-heading">{"\u20B9"}{f.price.toLocaleString('en-IN')}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-text-tertiary flex items-center gap-0.5 justify-end"><Star className="w-3 h-3 text-amber-400 fill-amber-400" />{f.rating}</p>
                <p className="text-xs text-text-secondary">{f.bookings} bookings</p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${f.status === 'active' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>{f.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
