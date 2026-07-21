export default function Skeleton({ className = '', rounded = 'rounded-card' }) {
  return (
    <div className={`shimmer ${rounded} ${className}`} />
  )
}
