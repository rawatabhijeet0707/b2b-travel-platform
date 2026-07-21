export default function AnimatedBlobs({ className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-blob" />
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-accent/10 blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-secondary/10 blur-3xl animate-blob" style={{ animationDelay: '8s' }} />
    </div>
  )
}
