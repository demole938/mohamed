import { useState } from 'react'
import { X } from 'lucide-react'
import Reveal from './Reveal'

interface Certification {
  name: string
  issuer: string
  date: string
  image?: string
}

const CERTIFICATIONS: Certification[] = [
  {
    name: 'Google Ads Measurement Certification',
    issuer: 'Google Skillshop',
    date: 'Nov 2025',
    image: '/certifications/google-ads-measurement.jpg',
  },
  {
    name: 'Meta Blueprint — Media Buying Professional',
    issuer: 'Meta',
    date: 'May 2025',
    image: '/certifications/meta-blueprint.jpg',
  },
  {
    name: 'Building Website Using WordPress',
    issuer: 'Edraak',
    date: 'Nov 2025',
    image: '/certifications/wordpress-edraak.jpg',
  },
  {
    name: 'Project Management Professional (PMP)',
    issuer: 'Almasar Professional Path Centre',
    date: '35 contact hours',
    image: '/certifications/pmp-completion.jpg',
  },
  {
    name: 'Google Ads Search & Display Certified',
    issuer: 'Google Skillshop',
    date: 'Certified',
  },
  {
    name: 'Google Analytics Individual Qualification (GAIQ)',
    issuer: 'Google Skillshop',
    date: 'Certified',
  },
  {
    name: 'HubSpot Inbound Marketing Certified',
    issuer: 'HubSpot Academy',
    date: 'Certified',
  },
]

export default function SectionCertifications() {
  const [active, setActive] = useState<Certification | null>(null)

  return (
    <section
      id="certifications"
      className="min-h-screen px-5 pb-12 pt-24 sm:px-8 sm:pt-28 md:px-12 md:pb-16"
    >
      {/* Top row */}
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <Reveal delay={120}>
          <span className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md">
            Verified Credentials
          </span>
        </Reveal>
        <Reveal delay={220} className="max-w-sm sm:text-right">
          <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
            Trained and certified directly by the platforms I run campaigns on — not
            self-taught guesswork.
          </p>
        </Reveal>
      </div>

      {/* Headline */}
      <Reveal delay={180}>
        <h2 className="mt-10 text-5xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
          Certified.
          <br />
          Not just claimed.
        </h2>
      </Reveal>

      {/* Certification grid */}
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map((cert, i) => (
          <Reveal key={cert.name} delay={150 + (i % 3) * 90}>
            <button
              type="button"
              onClick={() => cert.image && setActive(cert)}
              disabled={!cert.image}
              className={`group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-black/45 p-4 text-left backdrop-blur-xl transition-colors duration-300 ${
                cert.image ? 'cursor-pointer hover:border-white/25 hover:bg-black/55' : 'cursor-default'
              }`}
            >
              {cert.image ? (
                <img
                  src={cert.image}
                  alt={`${cert.name} certificate`}
                  loading="lazy"
                  className="h-16 w-16 shrink-0 rounded-lg border border-white/10 bg-white object-contain p-1"
                />
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                    Verified
                  </span>
                </div>
              )}
              <div className="min-w-0">
                <h3 className="text-sm font-medium leading-snug text-white sm:text-base">
                  {cert.name}
                </h3>
                <p className="mt-1 text-xs text-white/60">{cert.issuer}</p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-white/40">
                  {cert.date}
                </p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div className="relative max-h-[85vh] max-w-2xl overflow-auto rounded-2xl bg-white p-3">
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-white transition-colors hover:bg-black"
            >
              <X size={16} />
            </button>
            <img src={active.image} alt={active.name} className="w-full rounded-lg" />
          </div>
        </div>
      )}
    </section>
  )
}
