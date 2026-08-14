export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center pt-16 pb-8 px-4 text-center animate-fade-slide-in">
      {/* Icon */}
      <div className="w-16 h-16 rounded-3xl bg-stone-100 flex items-center justify-center mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#A8A29E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
          <line x1="12" x2="12" y1="19" y2="22"/>
        </svg>
      </div>

      <h2 className="text-base font-semibold text-stone-700 mb-2">
        Fale com a Katlyn
      </h2>
      <p className="text-sm text-stone-400 max-w-xs leading-relaxed">
        Digite seu pedido acima e a IA vai gerar sua lista de compras inteligente, já priorizando o que é crítico.
      </p>

      {/* Suggestion chips */}
      <div className="mt-6 flex flex-wrap gap-2 justify-center">
        {[
          'Compras do fim de semana',
          'Preciso reabastecer carnes',
          'O que está crítico no estoque?',
        ].map((hint) => (
          <span
            key={hint}
            className="px-3 py-1.5 rounded-full bg-white border border-stone-200 text-xs text-stone-500 shadow-sm"
          >
            {hint}
          </span>
        ))}
      </div>
    </div>
  )
}
