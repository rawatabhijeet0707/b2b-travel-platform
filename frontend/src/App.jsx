import { Routes, Route, useLocation } from 'react-router-dom'

import LandingPage from './pages/LandingPage.jsx'
import RegisterPage from './pages/auth/RegisterPage.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import FlightsPage from './pages/dashboard/FlightsPage.jsx'
import HotelsPage from './pages/dashboard/HotelsPage.jsx'
import BookingsPage from './pages/dashboard/BookingsPage.jsx'
import InsurancePage from './pages/dashboard/InsurancePage.jsx'
import VisaPage from './pages/dashboard/VisaPage.jsx'
import PackagesPage from './pages/dashboard/PackagesPage.jsx'
import WalletPage from './pages/dashboard/WalletPage.jsx'
import ReportsPage from './pages/dashboard/ReportsPage.jsx'
import SupportPage from './pages/dashboard/SupportPage.jsx'
import ProfilePage from './pages/dashboard/ProfilePage.jsx'
import KycPage from './pages/dashboard/KycPage.jsx'
import InvoicesPage from './pages/dashboard/InvoicesPage.jsx'
import PaymentsPage from './pages/dashboard/PaymentsPage.jsx'
import NotificationsPage from './pages/dashboard/NotificationsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import WhyMyPartnerPage from './pages/info/WhyMyPartnerPage.jsx'
import ProductHighlightsPage from './pages/info/ProductHighlightsPage.jsx'
import ServicesPage from './pages/info/ServicesPage.jsx'
import StepsToApplyPage from './pages/info/StepsToApplyPage.jsx'
import FAQPage from './pages/info/FAQPage.jsx'

// Admin imports
import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminUsers from './pages/admin/AdminUsers.jsx'
import AdminBookings from './pages/admin/AdminBookings.jsx'
import AdminCoupons from './pages/admin/AdminCoupons.jsx'
import AdminOffers from './pages/admin/AdminOffers.jsx'
import AdminSettings from './pages/admin/AdminSettings.jsx'
import AdminAuditLogs from './pages/admin/AdminAuditLogs.jsx'
import AdminChatbot from './pages/admin/AdminChatbot.jsx'
import AdminPlaceholder from './pages/admin/AdminPlaceholder.jsx'
import AdminAgents from './pages/admin/AdminAgents.jsx'
import AdminStaff from './pages/admin/AdminStaff.jsx'
import AdminRoles from './pages/admin/AdminRoles.jsx'
import AdminNotifications from './pages/admin/AdminNotifications.jsx'
import AdminTickets from './pages/admin/AdminTickets.jsx'
import AdminAISettings from './pages/admin/AdminAISettings.jsx'
import AdminReports from './pages/admin/AdminReports.jsx'
import AdminAnalytics from './pages/admin/AdminAnalytics.jsx'
import AdminRevenue from './pages/admin/AdminRevenue.jsx'
import AdminCommission from './pages/admin/AdminCommission.jsx'
import AdminKyc from './pages/admin/AdminKyc.jsx'
import AdminDocuments from './pages/admin/AdminDocuments.jsx'
import AdminSystemConfig from './pages/admin/AdminSystemConfig.jsx'
import AdminApiConfig from './pages/admin/AdminApiConfig.jsx'
import AdminSmtp from './pages/admin/AdminSmtp.jsx'
import AdminPaymentGateway from './pages/admin/AdminPaymentGateway.jsx'
import AdminFlights from './pages/admin/AdminFlights.jsx'
import AdminHotels from './pages/admin/AdminHotels.jsx'
import AdminVisa from './pages/admin/AdminVisa.jsx'
import AdminInsurance from './pages/admin/AdminInsurance.jsx'
import AdminPackages from './pages/admin/AdminPackages.jsx'
import AdminWallet from './pages/admin/AdminWallet.jsx'
import AdminTransactions from './pages/admin/AdminTransactions.jsx'
import AdminInvoices from './pages/admin/AdminInvoices.jsx'
import AdminPayments from './pages/admin/AdminPayments.jsx'
import AdminPromotions from './pages/admin/AdminPromotions.jsx'
import AdminCms from './pages/admin/AdminCms.jsx'
import AdminBlogs from './pages/admin/AdminBlogs.jsx'
import AdminTestimonials from './pages/admin/AdminTestimonials.jsx'
import AdminFaq from './pages/admin/AdminFaq.jsx'
import AdminNewsletter from './pages/admin/AdminNewsletter.jsx'

// Agent imports
import AgentLayout from './layouts/AgentLayout.jsx'
import AgentProtectedRoute from './components/AgentProtectedRoute.jsx'
import AgentDashboard from './pages/agent/AgentDashboard.jsx'
import AgentFlights from './pages/agent/AgentFlights.jsx'
import AgentHotels from './pages/agent/AgentHotels.jsx'
import AgentPackages from './pages/agent/AgentPackages.jsx'
import AgentVisa from './pages/agent/AgentVisa.jsx'
import AgentInsurance from './pages/agent/AgentInsurance.jsx'
import AgentCustomers from './pages/agent/AgentCustomers.jsx'
import AgentBookings from './pages/agent/AgentBookings.jsx'
import AgentMyBookings from './pages/agent/AgentMyBookings.jsx'
import AgentEarnings from './pages/agent/AgentEarnings.jsx'
import AgentWallet from './pages/agent/AgentWallet.jsx'
import AgentTransactions from './pages/agent/AgentTransactions.jsx'
import AgentReports from './pages/agent/AgentReports.jsx'
import AgentSupport from './pages/agent/AgentSupport.jsx'
import AgentNotifications from './pages/agent/AgentNotifications.jsx'
import AgentProfile from './pages/agent/AgentProfile.jsx'
import AgentSettings from './pages/agent/AgentSettings.jsx'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <Routes location={location}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/why-mypartner" element={<WhyMyPartnerPage />} />
        <Route path="/product-highlights" element={<ProductHighlightsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/steps-to-apply" element={<StepsToApplyPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/app" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="flights" element={<FlightsPage />} />
          <Route path="hotels" element={<HotelsPage />} />
          <Route path="insurance" element={<InsurancePage />} />
          <Route path="visa" element={<VisaPage />} />
          <Route path="packages" element={<PackagesPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="wallet" element={<WalletPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="kyc" element={<KycPage />} />
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminLayout />}><Route index element={<AdminDashboard />} /></Route>
        <Route path="/admin/users" element={<AdminLayout />}><Route index element={<AdminUsers />} /></Route>
        <Route path="/admin/agents" element={<AdminLayout />}><Route index element={<AdminAgents />} /></Route>
        <Route path="/admin/staff" element={<AdminLayout />}><Route index element={<AdminStaff />} /></Route>
        <Route path="/admin/roles" element={<AdminLayout />}><Route index element={<AdminRoles />} /></Route>
        <Route path="/admin/bookings" element={<AdminLayout />}><Route index element={<AdminBookings />} /></Route>
        <Route path="/admin/flights" element={<AdminLayout />}><Route index element={<AdminFlights />} /></Route>
        <Route path="/admin/hotels" element={<AdminLayout />}><Route index element={<AdminHotels />} /></Route>
        <Route path="/admin/visa" element={<AdminLayout />}><Route index element={<AdminVisa />} /></Route>
        <Route path="/admin/insurance" element={<AdminLayout />}><Route index element={<AdminInsurance />} /></Route>
        <Route path="/admin/packages" element={<AdminLayout />}><Route index element={<AdminPackages />} /></Route>
        <Route path="/admin/wallet" element={<AdminLayout />}><Route index element={<AdminWallet />} /></Route>
        <Route path="/admin/transactions" element={<AdminLayout />}><Route index element={<AdminTransactions />} /></Route>
        <Route path="/admin/invoices" element={<AdminLayout />}><Route index element={<AdminInvoices />} /></Route>
        <Route path="/admin/payments" element={<AdminLayout />}><Route index element={<AdminPayments />} /></Route>
        <Route path="/admin/coupons" element={<AdminLayout />}><Route index element={<AdminCoupons />} /></Route>
        <Route path="/admin/offers" element={<AdminLayout />}><Route index element={<AdminOffers />} /></Route>
        <Route path="/admin/promotions" element={<AdminLayout />}><Route index element={<AdminPromotions />} /></Route>
        <Route path="/admin/cms" element={<AdminLayout />}><Route index element={<AdminCms />} /></Route>
        <Route path="/admin/blogs" element={<AdminLayout />}><Route index element={<AdminBlogs />} /></Route>
        <Route path="/admin/testimonials" element={<AdminLayout />}><Route index element={<AdminTestimonials />} /></Route>
        <Route path="/admin/faq" element={<AdminLayout />}><Route index element={<AdminFaq />} /></Route>
        <Route path="/admin/newsletter" element={<AdminLayout />}><Route index element={<AdminNewsletter />} /></Route>
        <Route path="/admin/notifications" element={<AdminLayout />}><Route index element={<AdminNotifications />} /></Route>
        <Route path="/admin/tickets" element={<AdminLayout />}><Route index element={<AdminTickets />} /></Route>
        <Route path="/admin/chatbot" element={<AdminLayout />}><Route index element={<AdminChatbot />} /></Route>
        <Route path="/admin/ai-settings" element={<AdminLayout />}><Route index element={<AdminAISettings />} /></Route>
        <Route path="/admin/reports" element={<AdminLayout />}><Route index element={<AdminReports />} /></Route>
        <Route path="/admin/analytics" element={<AdminLayout />}><Route index element={<AdminAnalytics />} /></Route>
        <Route path="/admin/revenue" element={<AdminLayout />}><Route index element={<AdminRevenue />} /></Route>
        <Route path="/admin/commission" element={<AdminLayout />}><Route index element={<AdminCommission />} /></Route>
        <Route path="/admin/kyc" element={<AdminLayout />}><Route index element={<AdminKyc />} /></Route>
        <Route path="/admin/documents" element={<AdminLayout />}><Route index element={<AdminDocuments />} /></Route>
        <Route path="/admin/audit-logs" element={<AdminLayout />}><Route index element={<AdminAuditLogs />} /></Route>
        <Route path="/admin/settings" element={<AdminLayout />}><Route index element={<AdminSettings />} /></Route>
        <Route path="/admin/system-config" element={<AdminLayout />}><Route index element={<AdminSystemConfig />} /></Route>
        <Route path="/admin/api-config" element={<AdminLayout />}><Route index element={<AdminApiConfig />} /></Route>
        <Route path="/admin/smtp" element={<AdminLayout />}><Route index element={<AdminSmtp />} /></Route>
        <Route path="/admin/payment-gateway" element={<AdminLayout />}><Route index element={<AdminPaymentGateway />} /></Route>
        {/* Agent Routes */}
        <Route path="/agent" element={<AgentProtectedRoute><AgentLayout /></AgentProtectedRoute>}>
          <Route index element={<AgentDashboard />} />
          <Route path="dashboard" element={<AgentDashboard />} />
          <Route path="flights" element={<AgentFlights />} />
          <Route path="hotels" element={<AgentHotels />} />
          <Route path="packages" element={<AgentPackages />} />
          <Route path="visa" element={<AgentVisa />} />
          <Route path="insurance" element={<AgentInsurance />} />
          <Route path="customers" element={<AgentCustomers />} />
          <Route path="bookings" element={<AgentBookings />} />
          <Route path="my-bookings" element={<AgentMyBookings />} />
          <Route path="earnings" element={<AgentEarnings />} />
          <Route path="wallet" element={<AgentWallet />} />
          <Route path="transactions" element={<AgentTransactions />} />
          <Route path="reports" element={<AgentReports />} />
          <Route path="support" element={<AgentSupport />} />
          <Route path="notifications" element={<AgentNotifications />} />
          <Route path="profile" element={<AgentProfile />} />
          <Route path="settings" element={<AgentSettings />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
  )
}

export default function App() {
  return <AnimatedRoutes />
}
