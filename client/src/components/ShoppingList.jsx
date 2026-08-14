import ItemCard from './ItemCard.jsx'

const CATEGORY_ICONS = {
  'Carnes e Proteínas': '🥩',
  'Hortifruti': '🥬',
  'Embalagens & Bebidas': '📦',
  'Laticínios': '🧀',
  'Grãos e Secos': '🌾',
  'Limpeza': '🧹',
  'Outros': '🛒',
}

const URGENCY_ORDER = { 'Crítico': 0, 'Alerta': 1, 'Normal': 2 }

export default function ShoppingList({ shoppingList, checkedItems, onToggle }) {
  const categories = Object.entries(shoppingList)

  return (
    <div className="space-y-7">
      {categories.map(([category, items], catIdx) => {
        const sorted = [...items].sort(
          (a, b) => (URGENCY_ORDER[a.urgency] ?? 2) - (URGENCY_ORDER[b.urgency] ?? 2)
        )
        const icon = CATEGORY_ICONS[category] || '🛒'

        return (
          <section
            key={category}
            className="animate-fade-slide-in"
            style={{ animationDelay: `${catIdx * 80}ms` }}
          >
            {/* Category header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">{icon}</span>
              <h2 className="text-xs font-semibold tracking-wider text-stone-500 uppercase">
                {category}
              </h2>
              <div className="flex-1 h-px bg-stone-200" />
              <span className="text-xs text-stone-400">{items.length}</span>
            </div>

            {/* Items */}
            <div className="space-y-2.5">
              {sorted.map((item, itemIdx) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  checked={checkedItems.has(item.id)}
                  onToggle={() => onToggle(item.id)}
                  delay={catIdx * 80 + itemIdx * 50}
                />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
