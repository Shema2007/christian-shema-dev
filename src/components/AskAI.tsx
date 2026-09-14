import { FormEvent, useEffect, useRef, useState } from 'react'
import { Bot, Loader2, MessageCircle, Send, Sparkles, X } from 'lucide-react'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

const greeting: ChatMessage = {
  role: 'assistant',
  content: "Hi! I'm Christian's AI assistant. Ask me about his skills, services, projects, or how to work with him.",
}

export default function AskAI() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([greeting])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading, open])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const message = input.trim()
    if (!message || isLoading) return

    setInput('')
    setError('')
    setIsLoading(true)
    const userMessage: ChatMessage = { role: 'user', content: message }
    setMessages(current => [...current, userMessage])

    try {
      const response = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          history: messages.slice(1).slice(-8),
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'The AI assistant is temporarily unavailable.')
      setMessages(current => [...current, { role: 'assistant', content: data.answer }])
    } catch (requestError: unknown) {
      setError(requestError instanceof Error ? requestError.message : 'Please try again in a moment.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {open && (
        <section
          aria-label="Ask AI chat"
          className="fixed bottom-24 right-4 z-[1200] flex h-[min(650px,calc(100vh-8rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 text-white shadow-[0_24px_80px_rgba(2,6,23,0.7)] backdrop-blur-xl sm:bottom-24 sm:right-6"
        >
          <header className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-blue-600/20 via-indigo-500/10 to-transparent px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300 ring-1 ring-blue-400/30">
                <Sparkles size={18} />
              </div>
              <div>
                <p className="text-sm font-bold tracking-tight">Ask Christian&apos;s AI</p>
                <p className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  Portfolio assistant
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close Ask AI"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-3 py-4 sm:px-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'rounded-br-md bg-blue-600 text-white shadow-lg shadow-blue-950/30'
                      : 'rounded-bl-md border border-white/10 bg-white/[0.06] text-slate-200'
                  }`}
                >
                  {message.role === 'assistant' && <Bot size={14} className="mb-1 text-blue-300" />}
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] px-3.5 py-3 text-sm text-slate-400">
                  <Loader2 size={15} className="animate-spin text-blue-300" />
                  Thinking…
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="border-t border-white/10 bg-slate-950/80 p-3">
            {error && <p className="mb-2 px-1 text-xs leading-relaxed text-rose-300">{error}</p>}
            <form onSubmit={handleSubmit} className="flex items-end gap-2">
              <label htmlFor="ask-ai-message" className="sr-only">Ask a question</label>
              <textarea
                id="ask-ai-message"
                value={input}
                onChange={event => setInput(event.target.value)}
                onKeyDown={event => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault()
                    event.currentTarget.form?.requestSubmit()
                  }
                }}
                placeholder="Ask about Christian&apos;s work…"
                rows={1}
                maxLength={1200}
                disabled={isLoading}
                className="max-h-28 min-h-11 flex-1 resize-none rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/60 focus:bg-white/[0.08] disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send question"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isLoading ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} />}
              </button>
            </form>
            <p className="mt-2 text-center text-[10px] text-slate-600">Powered by Gemini · Shift + Enter for a new line</p>
          </div>
        </section>
      )}

      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open Ask AI chat"
          className="fixed bottom-24 right-4 z-[1200] flex items-center gap-2 rounded-full border border-blue-400/30 bg-slate-900/90 px-4 py-3 text-sm font-bold text-white shadow-[0_12px_36px_rgba(37,99,235,0.3)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-blue-300/60 hover:bg-slate-800 sm:bottom-24 sm:right-6"
        >
          <MessageCircle size={18} className="text-blue-300" />
          Ask AI
        </button>
      )}
    </>
  )
}