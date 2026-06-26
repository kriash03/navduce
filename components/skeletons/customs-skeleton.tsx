export function CustomsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="shimmer h-16 rounded-xl" />
        ))}
      </div>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="shimmer h-12 rounded-xl" />
      ))}
    </div>
  )
}
