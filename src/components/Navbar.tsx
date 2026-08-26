import Reveal from './Reveal'
import Logo from './Logo'

const WHATSAPP_URL = 'https://wa.me/201060449876'

const NAV_LINKS: { label: string; href: string; sup?: string }[] = [
  { label: 'Services', href: '#services', sup: '6' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: WHATSAPP_URL },
]

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15">
      <div className="flex items-center justify-between px-5 py-4 sm:px-8 md:px-12">
        {/* Logo */}
        <Reveal delay={0}>
          <a href="#" className="flex items-center gap-2 text-white">
            <Logo size={24} />
            <span className="text-lg font-medium tracking-tight sm:text-xl">
              mohamed ibrahem
            </span>
          </a>
        </Reveal>

        {/* Center links (md+) */}
        <nav className="hidden items-center gap-8 md:flex lg:gap-10">
          {NAV_LINKS.map((link, i) => (
            <Reveal key={link.label} delay={100 + i * 100}>
              <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                className="text-sm text-white/85 transition-colors duration-300 hover:text-white"
              >
                {link.label}
                {link.sup && (
                  <sup className="ml-0.5 font-mono text-[10px] text-white/60">{link.sup}</sup>
                )}
              </a>
            </Reveal>
          ))}
        </nav>

        {/* CTA */}
        <Reveal delay={500}>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-white/20 bg-white/15 px-4 py-2 text-xs text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/25 sm:px-5 sm:text-sm"
          >
            Get Free Consultation
          </a>
        </Reveal>
      </div>
    </header>
  )
}
