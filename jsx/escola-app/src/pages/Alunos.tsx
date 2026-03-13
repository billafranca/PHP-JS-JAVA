import React, { useState, useMemo } from 'react'
import { Search, Filter, UserPlus, ChevronDown, Eye, Edit, MoreHorizontal } from 'lucide-react'
import { mockAlunos } from '../utils/mockData'
import type { Aluno } from '../types'

type FilterStatus = 'todos' | 'ativo' | 'inativo' | 'transferido'
type FilterMensalidade = 'todos' | 'em_dia' | 'atrasada' | 'isenta'

function AlunoModal({ aluno, onClose }: { aluno: Aluno; onClose: () => void }) {
  const mediaNotas = aluno.notas.length > 0
    ? (aluno.notas.reduce((s, n) => s + n.valor, 0) / aluno.notas.length).toFixed(1)
    : 'N/A'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative card w-full max-w-lg p-6 animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-brand-500/20 flex items-center justify-center text-brand-400 font-display font-bold text-xl">
            {aluno.nome.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="font-display font-bold text-white text-lg">{aluno.nome}</h3>
            <p className="text-white/40 text-sm">{aluno.turma} · {aluno.serie}</p>
            <p className="text-white/25 text-xs mt-0.5 font-mono">Mat. {aluno.matricula}</p>
          </div>
          <span className={`badge ${aluno.status === 'ativo' ? 'badge-green' : aluno.status === 'inativo' ? 'badge-red' : 'badge-orange'}`}>
            {aluno.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { label: 'E-mail', value: aluno.email },
            { label: 'Telefone', value: aluno.telefone },
            { label: 'Responsável', value: aluno.responsavel },
            { label: 'Nascimento', value: new Date(aluno.dataNascimento + 'T12:00:00').toLocaleDateString('pt-BR') },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white/3 rounded-xl p-3">
              <p className="text-white/30 text-[11px] mb-0.5">{label}</p>
              <p className="text-white text-xs font-medium">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-3 text-center">
            <p className="font-display font-bold text-xl text-brand-400">{mediaNotas}</p>
            <p className="text-white/30 text-[11px]">Média Geral</p>
          </div>
          <div className={`${aluno.frequencia >= 75 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'} border rounded-xl p-3 text-center`}>
            <p className={`font-display font-bold text-xl ${aluno.frequencia >= 75 ? 'text-emerald-400' : 'text-rose-400'}`}>{aluno.frequencia}%</p>
            <p className="text-white/30 text-[11px]">Frequência</p>
          </div>
          <div className={`${aluno.mensalidade === 'em_dia' ? 'bg-emerald-500/10 border-emerald-500/20' : aluno.mensalidade === 'atrasada' ? 'bg-rose-500/10 border-rose-500/20' : 'bg-white/5 border-white/10'} border rounded-xl p-3 text-center`}>
            <p className={`font-display font-bold text-sm ${aluno.mensalidade === 'em_dia' ? 'text-emerald-400' : aluno.mensalidade === 'atrasada' ? 'text-rose-400' : 'text-white/50'}`}>
              {aluno.mensalidade === 'em_dia' ? 'Em Dia' : aluno.mensalidade === 'atrasada' ? 'Atrasada' : 'Isenta'}
            </p>
            <p className="text-white/30 text-[11px]">Mensalidade</p>
          </div>
        </div>

        {aluno.notas.length > 0 && (
          <div className="mb-5">
            <p className="text-white/30 text-xs mb-2">Notas — 1º Bimestre</p>
            <div className="grid grid-cols-2 gap-2">
              {aluno.notas.map(n => (
                <div key={n.disciplina} className="flex items-center justify-between bg-white/3 rounded-lg px-3 py-2">
                  <span className="text-white/50 text-xs">{n.disciplina}</span>
                  <span className={`font-mono font-medium text-sm ${n.valor >= 7 ? 'text-emerald-400' : n.valor >= 5 ? 'text-orange-400' : 'text-rose-400'}`}>
                    {n.valor.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <button className="btn-primary flex-1">
            <Edit size={14} />
            Editar Aluno
          </button>
          <button className="btn-ghost" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  )
}

export default function Alunos() {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('todos')
  const [filterMensalidade, setFilterMensalidade] = useState<FilterMensalidade>('todos')
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null)

  const filtered = useMemo(() => mockAlunos.filter(a => {
    const matchSearch = a.nome.toLowerCase().includes(search.toLowerCase()) ||
      a.matricula.includes(search) ||
      a.turma.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'todos' || a.status === filterStatus
    const matchMens = filterMensalidade === 'todos' || a.mensalidade === filterMensalidade
    return matchSearch && matchStatus && matchMens
  }), [search, filterStatus, filterMensalidade])

  return (
    <div className="space-y-4 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards' }}>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            className="input-field pl-9"
            placeholder="Buscar por nome, matrícula ou turma..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            className="input-field w-auto pr-8 appearance-none cursor-pointer"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as FilterStatus)}
          >
            <option value="todos">Todos Status</option>
            <option value="ativo">Ativos</option>
            <option value="inativo">Inativos</option>
            <option value="transferido">Transferidos</option>
          </select>
          <select
            className="input-field w-auto pr-8 appearance-none cursor-pointer"
            value={filterMensalidade}
            onChange={e => setFilterMensalidade(e.target.value as FilterMensalidade)}
          >
            <option value="todos">Mensalidade</option>
            <option value="em_dia">Em Dia</option>
            <option value="atrasada">Atrasada</option>
            <option value="isenta">Isenta</option>
          </select>
          <button className="btn-primary whitespace-nowrap">
            <UserPlus size={14} />
            <span className="hidden sm:inline">Novo Aluno</span>
          </button>
        </div>
      </div>

      {/* Summary badges */}
      <div className="flex gap-2 flex-wrap">
        <span className="badge badge-blue">{filtered.length} alunos</span>
        <span className="badge badge-green">{filtered.filter(a => a.status === 'ativo').length} ativos</span>
        <span className="badge badge-red">{filtered.filter(a => a.mensalidade === 'atrasada').length} inadimplentes</span>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-4 py-3 text-white/30 text-xs font-medium uppercase tracking-wider">Aluno</th>
                <th className="text-left px-4 py-3 text-white/30 text-xs font-medium uppercase tracking-wider hidden md:table-cell">Turma</th>
                <th className="text-left px-4 py-3 text-white/30 text-xs font-medium uppercase tracking-wider hidden lg:table-cell">Frequência</th>
                <th className="text-left px-4 py-3 text-white/30 text-xs font-medium uppercase tracking-wider">Mensalidade</th>
                <th className="text-left px-4 py-3 text-white/30 text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/3">
              {filtered.map((aluno) => (
                <tr
                  key={aluno.id}
                  className="table-row-hover"
                  onClick={() => setSelectedAluno(aluno)}
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-400 font-display font-bold text-sm flex-shrink-0">
                        {aluno.nome.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{aluno.nome}</p>
                        <p className="text-white/30 text-[11px] font-mono">{aluno.matricula}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell">
                    <span className="badge badge-blue">{aluno.turma}</span>
                  </td>
                  <td className="px-4 py-3.5 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full max-w-[80px]">
                        <div
                          className={`h-full rounded-full ${aluno.frequencia >= 75 ? 'bg-emerald-400' : 'bg-rose-400'}`}
                          style={{ width: `${aluno.frequencia}%` }}
                        />
                      </div>
                      <span className={`text-xs font-mono ${aluno.frequencia >= 75 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {aluno.frequencia}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`badge ${aluno.mensalidade === 'em_dia' ? 'badge-green' : aluno.mensalidade === 'atrasada' ? 'badge-red' : 'bg-white/5 text-white/50'}`}>
                      {aluno.mensalidade === 'em_dia' ? 'Em Dia' : aluno.mensalidade === 'atrasada' ? 'Atrasada' : 'Isenta'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`badge ${aluno.status === 'ativo' ? 'badge-green' : aluno.status === 'inativo' ? 'badge-red' : 'badge-orange'}`}>
                      {aluno.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <button className="w-7 h-7 flex items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/10 transition-colors">
                      <MoreHorizontal size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-white/30">
            <Search size={32} className="mx-auto mb-3 opacity-40" />
            <p className="font-body">Nenhum aluno encontrado</p>
          </div>
        )}
      </div>

      {selectedAluno && (
        <AlunoModal aluno={selectedAluno} onClose={() => setSelectedAluno(null)} />
      )}
    </div>
  )
}
