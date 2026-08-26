interface LogoProps {
  size?: number
  className?: string
}

/**
 * Custom "MI" monogram mark — same hexagon silhouette the site already used
 * (so nothing else needs to change), with an M cut into it instead of a
 * generic placeholder icon. Single-color stroke, inherits currentColor so
 * it drops in anywhere text color is white.
 */
export default function Logo({ size = 24, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M7.5 15.5v-7l4.5 4.5 4.5-4.5v7" />
    </svg>
  )
}
