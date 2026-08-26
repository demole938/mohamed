import { Linkedin, Instagram, Mail, MessageCircle } from 'lucide-react'
import Reveal from './Reveal'
import Logo from './Logo'

const WHATSAPP_URL = 'https://wa.me/201060449876'
const LINKEDIN_URL = 'https://www.linkedin.com/in/mohamed-ibrahem-mk/'
const INSTAGRAM_URL = 'https://www.instagram.com/mohamed.ibrahem.ai'
const EMAIL = 'Alexandermido4@gmail.com'

const SOCIALS = [
  { label: 'LinkedIn', href: LINKEDIN_URL, Icon: Linkedin },
  { label: 'Instagram', href: INSTAGRAM_URL, Icon: Instagram },
  { label: 'WhatsApp', href: WHATSAPP_URL, Icon: MessageCircle },
  { label: 'Email', href: `mailto:${EMAIL}`, Icon: Mail },
]

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/15 px-5 pb-8 pt-12 sm:px-8 md:px-12">
      <Reveal delay={0}>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand + blurb */}
          <div className="max-w-xs">
            <a href="#" className="flex items-center gap-2 text-white">
              <Logo size={22} />
              <span className="text-base font-medium tracking-tight">mohamedibrahem</span>
            </a>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Senior Media Buyer &amp; Account Manager — media buying systems built for clarity,
              precision, and measurable growth across the GCC and US markets.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
              Navigate
            </span>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/70 transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact + socials */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
              Get in touch
            </span>
            <a
              href={`mailto:${EMAIL}`}
              className="text-sm text-white/70 transition-colors duration-300 hover:text-white"
            >
              {EMAIL}
            </a>
            <div className="mt-1 flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-colors duration-300 hover:border-white/30 hover:bg-white/15 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col-reverse items-center gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
            © {year} Mohamed Ibrahem. All rights reserved.
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
            Alexandria, Egypt · Remote — KSA &amp; GCC
          </span>
        </div>
      </Reveal>
    </footer>
  )
}
