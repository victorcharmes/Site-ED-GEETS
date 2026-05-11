import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import Stats from '../components/Stats.jsx'
import News from '../components/News.jsx'
import Agenda from '../components/Agenda.jsx'
import Hub from '../components/Hub.jsx'
import HubPermanent from '../components/HubPermanent.jsx'
import EssentialInfo from '../components/EssentialInfo.jsx'
import Partners from '../components/Partners.jsx'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.replace('#', '')
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [location])

  return (
    <>
      <Hero />
      <Stats />
      <News />
      <Agenda />
      <Hub />
      <HubPermanent />
      <EssentialInfo />
      <Partners />
    </>
  )
}
