import { useEffect, useRef, useState } from 'react'

const LERP_FACTOR = 0.12
const SEEK_THRESHOLD = 0.04
// Mobile decoders can't keep up with frequent precise seeks — a looser
// threshold means fewer seek calls per second, which reads as smoother
// motion even though each individual jump is a touch bigger.
const MOBILE_SEEK_THRESHOLD = 0.09
const MOBILE_BREAKPOINT = 1024

interface ScrollVideoProps {
  src: string
}

// Loosely typed — fastSeek isn't in all lib.dom versions yet.
type SeekableVideo = HTMLVideoElement & { fastSeek?: (time: number) => void }

export default function ScrollVideo({ src }: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoVisible, setVideoVisible] = useState(false)
  const [posterVisible, setPosterVisible] = useState(true)

  const smoothedRef = useRef(0)
  const targetRef = useRef(0)
  const rafRef = useRef<number>(0)
  const durationRef = useRef(0)

  // Tracks whether the element is mid-seek, and the latest requested time
  // that arrived while it was busy — so we never queue more than one seek
  // ahead. This is what stops the "lag then jump" stutter on mobile.
  const seekingRef = useRef(false)
  const pendingTimeRef = useRef<number | null>(null)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      targetRef.current = Math.min(1, Math.max(0, p))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current as SeekableVideo | null
    if (!video) return

    const onLoadedMetadata = () => {
      durationRef.current = video.duration || 0
    }
    const onLoadedData = () => {
      setVideoVisible(true)
      setPosterVisible(false)
    }
    const onSeeking = () => {
      seekingRef.current = true
    }
    const onSeeked = () => {
      seekingRef.current = false
      // A newer target came in while we were busy — apply it now instead
      // of waiting for the next animation frame, so we don't fall behind.
      if (pendingTimeRef.current !== null) {
        const t = pendingTimeRef.current
        pendingTimeRef.current = null
        seekTo(video, t)
      }
    }

    video.addEventListener('loadedmetadata', onLoadedMetadata)
    video.addEventListener('loadeddata', onLoadedData)
    video.addEventListener('seeking', onSeeking)
    video.addEventListener('seeked', onSeeked)

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      video.removeEventListener('loadeddata', onLoadedData)
      video.removeEventListener('seeking', onSeeking)
      video.removeEventListener('seeked', onSeeked)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current as SeekableVideo | null
    if (!video) return

    const threshold =
      window.innerWidth < MOBILE_BREAKPOINT ? MOBILE_SEEK_THRESHOLD : SEEK_THRESHOLD

    const tick = () => {
      smoothedRef.current += (targetRef.current - smoothedRef.current) * LERP_FACTOR
      const p = smoothedRef.current
      const duration = durationRef.current

      // Ping-pong fold: forward through the first half of the page,
      // reverse back to frame 1 through the second half.
      const videoProgress = p <= 0.5 ? p / 0.5 : (1 - p) / 0.5

      if (duration && isFinite(duration)) {
        const t = videoProgress * Math.max(0, duration - 0.05)
        if (Math.abs(video.currentTime - t) > threshold) {
          if (seekingRef.current) {
            // Don't stack a new seek on top of one still in flight —
            // just remember where we want to end up.
            pendingTimeRef.current = t
          } else {
            seekTo(video, t)
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  function seekTo(video: SeekableVideo, t: number) {
    // fastSeek trades frame-perfect accuracy for speed — worth it here
    // since we're scrubbing continuously, not landing on one exact frame.
    if (typeof video.fastSeek === 'function') {
      try {
        video.fastSeek(t)
        return
      } catch {
        /* fall through to currentTime */
      }
    }
    try {
      video.currentTime = t
    } catch {
      /* seek not ready yet */
    }
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ backgroundColor: '#0a0a0a' }}
      aria-hidden="true"
    >
      {/*
        Instant placeholder — pure CSS, no network request, so it can never 404
        and always paints on the very first frame regardless of connection speed.
        Matches the video's own tones so the swap-in feels seamless rather than
        like a "loading" state.
      */}
      <div
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
          posterVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(120% 90% at 50% 15%, #cfd8df 0%, #b9c4cd 45%, #98a5b0 100%)',
        }}
      />
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          videoVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {/*
        Persistent contrast scrim. The video's own tones swing from dark to
        near-white as it scrubs, which was making white text and glass cards
        disappear during the lighter frames. This gradient sits above the
        video at all times so text contrast stays consistent everywhere on
        the page, not just in the frames that happen to be dark.
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/60" />
    </div>
  )
}
