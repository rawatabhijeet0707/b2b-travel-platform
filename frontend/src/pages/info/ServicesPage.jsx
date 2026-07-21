import InfoPageLayout from '../../layouts/InfoPageLayout.jsx'
import ServicesOverview from '../../components/landing/ServicesOverview.jsx'
import BusinessBenefits from '../../components/landing/BusinessBenefits.jsx'

export default function ServicesPage() {
  return (
    <InfoPageLayout>
      <ServicesOverview />
      <BusinessBenefits />
    </InfoPageLayout>
  )
}
