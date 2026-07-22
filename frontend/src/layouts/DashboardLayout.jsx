import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import DashboardNavbar from '../components/dashboard/DashboardNavbar.jsx'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.jsx'
import AIChatbot from '../components/chatbot/AIChatbot.jsx'

export default function DashboardLayout() {
  const location = useLocation()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-bg">
      <DashboardNavbar />
      <DashboardSidebar onCollapseChange={setSidebarCollapsed} />
      <main
        className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-[240px]'}`}
      >
        <Outlet key={location.pathname} />
      </main>
      <AIChatbot />
    </div>
  )
}
