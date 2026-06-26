export function LanguageSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {[100, 80, 90, 80, 90].map((w, i) => (
          <div key={i} className="shimmer h-8 rounded-full shrink-0" style={{ width: w }} />
        ))}
      </div>
      {[0, 1, 2].map((i) => (
        <div key={i} className="shimmer h-24 rounded-xl" />
      ))}
    </div>
  )
}
