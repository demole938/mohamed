import { useEffect, useState } from 'react'

const DESKTOP_VIDEO_URL = '/hero.mp4'
const MOBILE_VIDEO_URL = '/hero-mobile.mp4'
const MOBILE_BREAKPOINT = 1024

interface PreloaderProps {
  onReady: (videoObjectUrl: string) => void
}

/**
 * Full-screen loading gate. Downloads the hero video to 100% with a visible
 * percentage before handing control back to the app, so the rest of the
 * site only mounts once the video is fully ready — no stutter once inside.
 *
 * On small screens it fetches a lighter, mobile-optimized encode instead of
 * the desktop file — lower resolution and denser keyframes so scroll-seeking
 * stays smooth on phone hardware. See README for how to generate it.
 */
export default function Preloader({ onReady }: PreloaderProps) {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    let cancelled = false
    const videoUrl = window.innerWidth < MOBILE_BREAKPOINT ? MOBILE_VIDEO_URL : DESKTOP_VIDEO_URL

    const load = async () => {
      try {
        const res = await fetch(videoUrl)
        if (!res.ok || !res.body) throw new Error('video fetch failed')

        const total = Number(res.headers.get('content-length')) || 0
        const reader = res.body.getReader()
        const chunks: Uint8Array[] = []
        let received = 0

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          if (cancelled) return
          if (value) {
            chunks.push(value)
            received += value.length
            if (total > 0) {
              setPercent(Math.min(99, Math.round((received / total) * 100)))
            }
          }
        }

        const blob = new Blob(chunks as BlobPart[])
        const objectUrl = URL.createObjectURL(blob)
        if (cancelled) return
        setPercent(100)
        setTimeout(() => {
          if (!cancelled) onReady(objectUrl)
        }, 200)
      } catch {
        // Fall back to letting the browser stream the file directly.
        if (!cancelled) onReady(videoUrl)
      }
    }

    load()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <span className="font-mono text-4xl font-medium tracking-tight text-white sm:text-5xl">
        {percent}%
      </span>
      <div className="h-px w-40 overflow-hidden bg-white/15 sm:w-56">
        <div
          className="h-full bg-white transition-all duration-200 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">
        Loading
      </span>
    </div>
  )
}
