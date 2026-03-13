import React, { useState } from 'react'
import { Search, UserPlus, Mail, Phone, Clock, MoreHorizontal } from 'lucide-react'
import { mockProfessores } from '../utils/mockData'

export default function Professores() {
  const [search, setSearch] = useState('')
  const filtered = mockProfessores.filter(p =>
    p.nome.toLowerCase().includes(search.toLowerCase()) ||
    p.disciplinas.some(d => d.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-4 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards' }}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input className="input-field pl-9" placeholder="Buscar professor ou disciplina..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button className="btn-primary">
          <UserPlus size={14} />
          Novo Professor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((prof, i) => (
          <div
            key={prof.id}
            className="card-hover p-5 animate-slide-up opacity-0"
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'forwards' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500/30 to-purple-500/30 flex items-center justify-center text-white font-display font-bold text-lg">
                  {prof.nome.replace('Prof. ', '').replace('Profa. ', '').charAt(0)}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{prof.nome}</p>
                  <p className="text-white/30 text-xs">{prof.disciplinas[0]}{prof.disciplinas.length > 1 ? ` +${prof.disciplinas.length - 1}` : ''}</p>
                </div>
              </div>
              <span className={`badge ${prof.status === 'ativo' ? 'badge-green' : 'badge-orange'}`}>{prof.status}</span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <Mail size={12} />
                <span className="truncate">{prof.email}</span>
              </div>
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <Phone size={12} />
                <span>{prof.telefone}</span>
              </div>
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <Clock size={12} />
                <span>{prof.cargaHoraria}h semanais</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-white/25 text-[11px] mb-2">Disciplinas</p>
              <div className="flex flex-wrap gap-1.5">
                {prof.disciplinas.map(d => (
                  <span key={d} className="badge badge-blue">{d}</span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-white/25 text-[11px] mb-2">Turmas ({prof.turmas.length})</p>
              <div className="flex flex-wrap gap-1.5">
                {prof.turmas.map(t => (
                  <span key={t} className="badge bg-white/5 text-white/50">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card py-16 text-center text-white/30">
          <Search size={32} className="mx-auto mb-3 opacity-40" />
          <p>Nenhum professor encontrado</p>
        </div>
      )}
    </div>
  )
}
