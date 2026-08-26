import { ChevronRight } from 'lucide-react'
import Reveal from './Reveal'

const WHATSAPP_URL = 'https://wa.me/201060449876'

const SERVICES = ['/ META ADS', '/ TIKTOK ADS', '/ SNAPCHAT ADS', '/ GOOGLE ADS', '/ LINKEDIN ADS']

export default function SectionOne() {
  return (
    <section
      id="services"
      className="flex min-h-screen flex-col justify-between px-5 pb-12 pt-24 supports-[height:100svh]:min-h-[100svh] sm:px-8 sm:pt-28 md:px-12 md:pb-16"
    >
      {/* Top row */}
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        {/* Left — service list */}
        <div className="flex flex-col gap-2">
          {SERVICES.map((service, i) => (
            <Reveal key={service} delay={150 + i * 120}>
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md">
                {service}
              </span>
            </Reveal>
          ))}
        </div>

        {/* Right — intro */}
        <Reveal delay={300} className="max-w-xs sm:text-right">
          <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
            I build media buying systems that turn ad spend into measurable, compounding growth — across the GCC, the US, and beyond.
          </p>
        </Reveal>
      </div>

      {/* Bottom row */}
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        {/* Left — badge + H1 */}
        <div>
          <Reveal delay={150}>
            <span className="mb-5 inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md">
              +350K SAR Managed Monthly Ad Spend
            </span>
          </Reveal>
          <Reveal delay={280}>
            <h1 className="text-5xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
              Scale. Optimize.
              <br />
              Convert.
            </h1>
          </Reveal>
        </div>

        {/* Right — glass contact card */}
        <Reveal delay={420}>
          <div className="flex items-center gap-4 rounded-xl bg-white/15 p-3 backdrop-blur-md">
            <img
              src="/portrait.jpg"
              alt="Mohamed Ibrahem, Senior Media Buyer & Account Manager"
              className="h-24 w-20 rounded-lg object-cover"
            />
            <div className="flex flex-col gap-1.5 pr-2">
              <span className="text-sm font-medium text-white">Talk with Mohamed</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">
                Senior Media Buyer &amp; Account Manager
              </span>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-1.5 inline-flex w-fit items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85"
              >
                Book 15-mins call
                <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
