import React from 'react'
import { BookOpen, Users, Sun, Sunset, Moon, Clock, Plus } from 'lucide-react'
import { mockTurmas } from '../utils/mockData'

const turnoIcon = { 'manhã': Sun, 'tarde': Sunset, 'noite': Moon, 'integral': Clock }
const turnoBadge = { 'manhã': 'badge-blue', 'tarde': 'badge-orange', 'noite': 'bg-purple-500/15 text-purple-400 badge', 'integral': 'badge-green' }

export default function Turmas() {
  return (
    <div className="space-y-4 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards' }}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-white/40 text-sm">{mockTurmas.length} turmas cadastradas</p>
        </div>
        <button className="btn-primary">
          <Plus size={14} />
          Nova Turma
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockTurmas.map((turma, i) => {
          const ocupacao = Math.round((turma.totalAlunos / turma.capacidade) * 100)
          const Icon = turnoIcon[turma.turno]
          return (
            <div
              key={turma.id}
              className="card-hover p-5 animate-slide-up opacity-0"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/15 flex items-center justify-center">
                    <BookOpen size={18} className="text-brand-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white">{turma.nome}</h3>
                    <p className="text-white/30 text-xs">{turma.sala}</p>
                  </div>
                </div>
                <span className={turnoBadge[turma.turno]}>
                  <Icon size={10} />
                  {turma.turno}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 text-white/40 text-xs">
                    <Users size={12} />
                    <span>{turma.totalAlunos} / {turma.capacidade} alunos</span>
                  </div>
                  <span className={`text-xs font-mono font-medium ${ocupacao >= 90 ? 'text-rose-400' : ocupacao >= 70 ? 'text-orange-400' : 'text-emerald-400'}`}>
                    {ocupacao}%
                  </span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${ocupacao >= 90 ? 'bg-rose-400' : ocupacao >= 70 ? 'bg-orange-400' : 'bg-emerald-400'}`}
                    style={{ width: `${ocupacao}%` }}
                  />
                </div>
              </div>

              <div className="bg-white/3 rounded-xl px-3 py-2.5">
                <p className="text-white/25 text-[11px] mb-0.5">Professor Titular</p>
                <p className="text-white text-xs font-medium">{turma.professor}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
