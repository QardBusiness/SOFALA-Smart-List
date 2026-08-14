import { useState, useRef } from 'react'

export default function CommandBar({ onSubmit, isLoading }) {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value.trim() || isLoading) return
    onSubmit(value.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div
        className={`
          flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5
          shadow-sm border transition-all duration-200
          ${isLoading
            ? 'border-violet-200 shadow-violet-100'
            : 'border-stone-200 focus-within:border-stone-400 focus-within:shadow-md'
          }
        `}
      >
        {/* Mic icon left */}
        <div className={`shrink-0 transition-colors duration-200 ${isLoading ? 'text-violet-400' : 'text-stone-300'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" x2="12" y1="19" y2="22"/>
          </svg>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={isLoading}
          placeholder="Katlyn, o que preciso comprar no Ceasa hoje?"
          className="flex-1 bg-transparent text-sm text-stone-700 placeholder:text-stone-400 outline-none disabled:opacity-50"
        />

        {/* Send button */}
        <button
          type="submit"
          disabled={isLoading || !value.trim()}
          className={`
            shrink-0 w-9 h-9 rounded-xl flex items-center justify-center
            transition-all duration-200 active:scale-95
            ${isLoading || !value.trim()
              ? 'bg-stone-100 text-stone-300 cursor-not-allowed'
              : 'bg-stone-800 text-white shadow-sm hover:bg-stone-700'
            }
          `}
        >
          {isLoading ? (
            <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 2-7 20-4-9-9-4Z"/>
              <path d="M22 2 11 13"/>
            </svg>
          )}
        </button>
      </div>

      {isLoading && (
        <p className="text-center text-xs text-violet-500 mt-3 animate-pulse">
          Katlyn está analisando o estoque…
        </p>
      )}
    </form>
  )
}
