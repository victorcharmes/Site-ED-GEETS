import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AdminProvider } from './context/AdminContext.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import SearchModal from './components/SearchModal.jsx'
import AccessibilityWidget from './components/AccessibilityWidget.jsx'
import Home from './pages/Home.jsx'
import NewsPage from './pages/NewsPage.jsx'
import AgendaPage from './pages/AgendaPage.jsx'
import LaboratoriesPage from './pages/LaboratoriesPage.jsx'
import FaqPage from './pages/FaqPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import PhdResourcesPage from './pages/PhdResourcesPage.jsx'
import PermanentResourcesPage from './pages/PermanentResourcesPage.jsx'
import LegalNoticePage from './pages/LegalNoticePage.jsx'
import RgpdPage from './pages/RgpdPage.jsx'
import AccessibilityPage from './pages/AccessibilityPage.jsx'
import AdminPage from './pages/AdminPage.jsx'

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  return (
    <AdminProvider>
      <Routes>
        {/* Route admin — sans Header/Footer */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Routes normales — avec Header/Footer */}
        <Route path="/*" element={
          <>
            <Header onOpenSearch={() => setIsSearchOpen(true)} />
            <main id="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/actualites" element={<NewsPage />} />
                <Route path="/agenda" element={<AgendaPage />} />
                <Route path="/laboratoires" element={<LaboratoriesPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/qui-sommes-nous" element={<AboutPage />} />
                <Route path="/ressources-doctorants" element={<PhdResourcesPage />} />
                <Route path="/ressources-permanents" element={<PermanentResourcesPage />} />
                <Route path="/mentions-legales" element={<LegalNoticePage />} />
                <Route path="/rgpd" element={<RgpdPage />} />
                <Route path="/accessibilite" element={<AccessibilityPage />} />
              </Routes>
            </main>
            <Footer />
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <AccessibilityWidget />
          </>
        } />
      </Routes>
    </AdminProvider>
  )
}
