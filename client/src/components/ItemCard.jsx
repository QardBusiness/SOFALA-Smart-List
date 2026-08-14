const URGENCY_CONFIG = {
  Crítico: {
    badge: 'bg-red-50 text-red-600 border-red-200',
    dot: 'bg-red-500',
    label: 'Crítico',
  },
  Alerta: {
    badge: 'bg-amber-50 text-amber-600 border-amber-200',
    dot: 'bg-amber-400',
    label: 'Alerta',
  },
  Normal: {
    badge: 'bg-stone-100 text-stone-500 border-stone-200',
    dot: 'bg-stone-300',
    label: 'Normal',
  },
}

export default function ItemCard({ item, checked, onToggle, delay = 0 }) {
  const config = URGENCY_CONFIG[item.urgency] || URGENCY_CONFIG['Normal']

  return (
    <button
      onClick={onToggle}
      className={`
        w-full text-left flex items-center gap-4 px-4 py-3.5 rounded-2xl
        bg-white border transition-all duration-200 active:scale-[0.98]
        animate-fade-slide-in
        ${checked
          ? 'border-stone-100 opacity-50 shadow-none'
          : 'border-stone-200 shadow-sm hover:border-stone-300 hover:shadow-md'
        }
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Checkbox */}
      <div
        className={`
          shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center
          transition-all duration-200
          ${checked
            ? 'bg-emerald-500 border-emerald-500'
            : 'border-stone-300 bg-white'
          }
        `}
      >
        {checked && (
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold text-stone-800 truncate transition-all duration-200 ${checked ? 'item-checked' : ''}`}>
          {item.item}
        </p>
        <p className={`text-xs text-stone-400 mt-0.5 transition-all duration-200 ${checked ? 'item-checked' : ''}`}>
          {item.qty}
        </p>
      </div>

      {/* Urgency badge */}
      {!checked && (
        <span
          className={`
            shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1
            rounded-full border text-xs font-medium
            ${config.badge}
          `}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
          {config.label}
        </span>
      )}
    </button>
  )
}
