import { useState } from 'react'
import Preloader from './components/Preloader'
import ScrollVideo from './components/ScrollVideo'
import Navbar from './components/Navbar'
import SectionOne from './components/SectionOne'
import SectionTwo from './components/SectionTwo'
import SectionThree from './components/SectionThree'
import SectionCertifications from './components/SectionCertifications'
import Footer from './components/Footer'

export default function App() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null)

  if (!videoSrc) {
    return <Preloader onReady={setVideoSrc} />
  }

  return (
    <div className="relative">
      <ScrollVideo src={videoSrc} />
      <div className="relative z-10">
        <Navbar />
        <main>
          <SectionOne />
          <div className="h-[80vh]" aria-hidden="true" />
          <SectionTwo />
          <div className="h-[60vh]" aria-hidden="true" />
          <SectionThree />
          <div className="h-[40vh]" aria-hidden="true" />
          <SectionCertifications />
        </main>
        <Footer />
      </div>
    </div>
  )
}
