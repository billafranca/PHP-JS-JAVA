import React, { useState } from 'react'
import { Bell, Plus, AlertTriangle, Info, MessageSquare, Search } from 'lucide-react'
import { mockComunicados } from '../utils/mockData'
import type { Comunicado } from '../types'

const prioridadeIcon = {
  urgente: AlertTriangle,
  info: Info,
  normal: MessageSquare,
}
const prioridadeBadge = {
  urgente: 'badge-red',
  info: 'badge-blue',
  normal: 'bg-white/5 text-white/50 badge',
}

function ComunicadoModal({ comunicado, onClose }: { comunicado: Comunicado; onClose: () => void }) {
  const Icon = prioridadeIcon[comunicado.prioridade]
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative card w-full max-w-lg p-6 animate-slide-up" onClick={e => e.stopPropagation()}>
        <div className="flex items-start gap-3 mb-4">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${comunicado.prioridade === 'urgente' ? 'bg-rose-500/15 text-rose-400' : comunicado.prioridade === 'info' ? 'bg-brand-500/15 text-brand-400' : 'bg-white/5 text-white/40'}`}>
            <Icon size={16} />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-semibold text-white">{comunicado.titulo}</h3>
            <p className="text-white/30 text-xs mt-0.5">{comunicado.autor} · {new Date(comunicado.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
          </div>
          <span className={prioridadeBadge[comunicado.prioridade]}>{comunicado.prioridade}</span>
        </div>
        <div className="bg-white/3 rounded-xl p-4 mb-4">
          <p className="text-white/70 text-sm leading-relaxed">{comunicado.conteudo}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {comunicado.destinatarios.map(d => (
              <span key={d} className="badge badge-blue">{d}</span>
            ))}
          </div>
          <button className="btn-ghost" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  )
}

export default function Comunicados() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Comunicado | null>(null)

  const filtered = mockComunicados.filter(c =>
    c.titulo.toLowerCase().includes(search.toLowerCase()) ||
    c.conteudo.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards' }}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input className="input-field pl-9" placeholder="Buscar comunicados..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button className="btn-primary">
          <Plus size={14} />
          Novo Comunicado
        </button>
      </div>

      <div className="space-y-3">
        {filtered.map((c, i) => {
          const Icon = prioridadeIcon[c.prioridade]
          return (
            <div
              key={c.id}
              className="card-hover p-4 cursor-pointer animate-slide-up opacity-0"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'forwards' }}
              onClick={() => setSelected(c)}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${c.prioridade === 'urgente' ? 'bg-rose-500/15 text-rose-400' : c.prioridade === 'info' ? 'bg-brand-500/15 text-brand-400' : 'bg-white/5 text-white/40'}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className={`font-medium text-sm ${c.lido ? 'text-white/60' : 'text-white'}`}>{c.titulo}</h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!c.lido && <div className="w-2 h-2 bg-brand-400 rounded-full animate-pulse-soft" />}
                      <span className={prioridadeBadge[c.prioridade]}>{c.prioridade}</span>
                    </div>
                  </div>
                  <p className="text-white/40 text-xs line-clamp-2">{c.conteudo}</p>
                  <p className="text-white/25 text-[11px] mt-1.5">{c.autor} · {new Date(c.data).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="card py-16 text-center text-white/30">
          <Bell size={32} className="mx-auto mb-3 opacity-40" />
          <p>Nenhum comunicado encontrado</p>
        </div>
      )}

      {selected && <ComunicadoModal comunicado={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
