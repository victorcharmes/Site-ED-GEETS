import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AdminProvider } from './context/AdminContext.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import SearchModal from './components/SearchModal.jsx'
import ColorSwitcher from './components/ColorSwitcher.jsx'
import AccessibilityWidget from './components/AccessibilityWidget.jsx'
import Home from './pages/Home.jsx'
import NewsPage from './pages/NewsPage.jsx'
import AgendaPage from './pages/AgendaPage.jsx'
import LaboratoriesPage from './pages/LaboratoriesPage.jsx'
import FaqPage from './pages/FaqPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import PhdResourcesPage from './pages/PhdResourcesPage.jsx'
import LegalNoticePage from './pages/LegalNoticePage.jsx'

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <AdminProvider>
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
          <Route path="/mentions-legales" element={<LegalNoticePage />} />
        </Routes>
      </main>
      <Footer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ColorSwitcher />
      <AccessibilityWidget />
    </AdminProvider>
  )
}
