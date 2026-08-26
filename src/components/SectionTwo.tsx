import { ChevronRight } from 'lucide-react'
import Reveal from './Reveal'

const WHATSAPP_URL = 'https://wa.me/201060449876'
const LINKEDIN_URL = 'https://www.linkedin.com/in/mohamed-ibrahem-mk/'

const CAPABILITIES = [
  {
    index: '01',
    title: 'Funnel Architecture',
    body: 'Landing pages built and tracked from first click to final conversion — no leak points.',
  },
  {
    index: '02',
    title: 'Data-Driven Scaling',
    body: 'Every ad set audited against CPL/CPA targets before a single riyal scales further.',
  },
  {
    index: '03',
    title: 'Creative Testing',
    body: 'Rapid AI-assisted creative cycles that keep CTR high and CPA low.',
  },
]

export default function SectionTwo() {
  return (
    <section
      id="experience"
      className="flex min-h-screen flex-col justify-between px-5 pb-12 pt-24 supports-[height:100svh]:min-h-[100svh] sm:px-8 sm:pt-28 md:px-12 md:pb-16"
    >
      {/* Top row */}
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        {/* Left badge */}
        <Reveal delay={120}>
          <span className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md">
            Data-Driven Scaling
          </span>
        </Reveal>

        {/* Right copy */}
        <Reveal delay={220} className="max-w-sm sm:text-right">
          <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
            Data doesn&apos;t just report — it reveals what&apos;s working, sharpens
            targeting, and delivers the leads you need.
          </p>
        </Reveal>
      </div>

      {/* Bottom area */}
      <div
        className="flex flex-1 flex-col justify-end gap-12 md:flex-row md:items-end md:justify-between md:gap-16"
      >
        {/* Left column */}
        <div className="max-w-xl">
          <Reveal delay={180}>
            <h2 className="text-5xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
              Turn spend into
              <br />
              results.
            </h2>
          </Reveal>
          <Reveal delay={320}>
            <p className="mt-6 max-w-md text-sm text-white/80 drop-shadow-md sm:text-base">
              4+ years running a full-stack media buying workflow for GCC and US brands —
              from tracking architecture (GTM, CAPI) and landing page builds to real-time
              Power BI dashboards. I don&apos;t just manage the ad account, I own the whole
              funnel, from first click to closed deal.
            </p>
          </Reveal>
          <Reveal delay={370}>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {[
                { value: '4+', label: 'Years Experience' },
                { value: '5', label: 'Ad Platforms' },
                { value: 'GCC · US', label: 'Markets Served' },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="block text-2xl font-medium text-white">{stat.value}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={420}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85 sm:text-sm"
              >
                View my work
                <ChevronRight size={14} />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-xs text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:text-sm"
              >
                Free consultation
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right — frosted capability panel */}
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/40 px-5 backdrop-blur-xl sm:px-6">
          {CAPABILITIES.map((cap, i) => (
            <Reveal
              key={cap.index}
              delay={300 + i * 110}
              className={i < CAPABILITIES.length - 1 ? 'border-b border-white/15' : ''}
            >
              <div className="group flex gap-5 py-5">
                <span className="font-mono text-[11px] tracking-[0.15em] text-white/55">
                  {cap.index}
                </span>
                <div>
                  <h3 className="flex items-center gap-1 text-base font-medium text-white sm:text-lg">
                    {cap.title}
                    <ChevronRight
                      size={16}
                      className="text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white"
                    />
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">{cap.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
