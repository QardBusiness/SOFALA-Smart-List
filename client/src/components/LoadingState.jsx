export default function LoadingState() {
  return (
    <div className="space-y-7 animate-fade-slide-in">
      {[
        { icon: '🥩', label: 'Carnes e Proteínas', count: 2 },
        { icon: '🥬', label: 'Hortifruti', count: 2 },
        { icon: '📦', label: 'Embalagens & Bebidas', count: 2 },
      ].map((cat) => (
        <section key={cat.label}>
          {/* Category header skeleton */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base opacity-30">{cat.icon}</span>
            <div className="h-3 w-28 rounded shimmer" />
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          {/* Item skeletons */}
          <div className="space-y-2.5">
            {Array.from({ length: cat.count }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-4 py-3.5 rounded-2xl bg-white border border-stone-100"
              >
                <div className="w-6 h-6 rounded-full shimmer shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3.5 w-32 rounded shimmer" />
                  <div className="h-2.5 w-16 rounded shimmer" />
                </div>
                <div className="h-6 w-16 rounded-full shimmer shrink-0" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
