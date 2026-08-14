import { useState } from 'react'
import CommandBar from './components/CommandBar.jsx'
import ShoppingList from './components/ShoppingList.jsx'
import LoadingState from './components/LoadingState.jsx'
import EmptyState from './components/EmptyState.jsx'

export default function App() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [listData, setListData] = useState(null)
  const [agentName, setAgentName] = useState('')
  const [checkedItems, setCheckedItems] = useState(new Set())

  const handleSubmit = async (command) => {
    if (!command.trim()) return
    setStatus('loading')
    setCheckedItems(new Set())
    setListData(null)

    try {
      const res = await fetch('/api/smart-list/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command }),
      })
      if (!res.ok) throw new Error('Erro na resposta do servidor')
      const data = await res.json()
      setListData(data.shoppingList)
      setAgentName(data.agent || 'Katlyn AI')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const toggleItem = (id) => {
    setCheckedItems((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const totalItems = listData
    ? Object.values(listData).reduce((acc, items) => acc + items.length, 0)
    : 0
  const doneCount = checkedItems.size

  return (
    <div className="min-h-screen bg-[#F7F6F3] flex flex-col max-w-lg mx-auto">
      {/* Header */}
      <header className="px-5 pt-10 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-ring" />
          <span className="text-xs font-medium tracking-widest text-stone-400 uppercase">
            SOFALA · Smart List
          </span>
        </div>
        <h1 className="text-2xl font-bold text-stone-800 leading-tight">
          O que comprar<br />
          <span className="text-stone-400 font-light">no Ceasa hoje?</span>
        </h1>
      </header>

      {/* Command Bar */}
      <div className="px-5 pb-6">
        <CommandBar onSubmit={handleSubmit} isLoading={status === 'loading'} />
      </div>

      {/* Content Area */}
      <main className="flex-1 px-5 pb-10">
        {status === 'idle' && <EmptyState />}

        {status === 'loading' && <LoadingState />}

        {status === 'error' && (
          <div className="animate-fade-slide-in rounded-2xl bg-red-50 border border-red-100 p-5 text-center">
            <p className="text-sm font-medium text-red-600">Não foi possível conectar ao servidor.</p>
            <p className="text-xs text-red-400 mt-1">Verifique se o backend está rodando.</p>
          </div>
        )}

        {status === 'success' && listData && (
          <div className="animate-fade-slide-in">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-stone-500">
                  {doneCount} de {totalItems} itens coletados
                </span>
                <span className="text-xs font-semibold text-emerald-600">
                  {totalItems > 0 ? Math.round((doneCount / totalItems) * 100) : 0}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${totalItems > 0 ? (doneCount / totalItems) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Agent badge */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center">
                <span className="text-xs">🤖</span>
              </div>
              <span className="text-xs text-stone-500">
                Gerado por <strong className="text-stone-700">{agentName}</strong>
              </span>
            </div>

            <ShoppingList
              shoppingList={listData}
              checkedItems={checkedItems}
              onToggle={toggleItem}
            />
          </div>
        )}
      </main>
    </div>
  )
}
