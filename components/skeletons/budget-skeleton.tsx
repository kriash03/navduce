export function BudgetSkeleton() {
  return (
    <div className="space-y-4">
      <div className="shimmer h-20 rounded-xl" />
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="shimmer h-24 rounded-xl" />
        ))}
      </div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="shimmer h-10 rounded-xl" />
      ))}
    </div>
  )
}
