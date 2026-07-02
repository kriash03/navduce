export function LearnSkeleton() {
  return (
    <div className="space-y-3">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="shimmer rounded-xl h-20" />
      ))}
    </div>
  )
}
