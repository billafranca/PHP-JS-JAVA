import React, { useState, useMemo } from 'react'
import { Search, Plus, DollarSign, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { mockFinanceiro } from '../utils/mockData'

const fmt = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

type FilterStatus = 'todos' | 'pago' | 'pendente' | 'vencido'

export default function Financeiro() {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('todos')

  const filtered = useMemo(() => mockFinanceiro.filter(f => {
    const matchSearch = f.aluno.toLowerCase().includes(search.toLowerCase()) ||
      f.descricao.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'todos' || f.status === filterStatus
    return matchSearch && matchStatus
  }), [search, filterStatus])

  const totalPago = mockFinanceiro.filter((f: import('../types').Financeiro) => f.status === 'pago').reduce((s: number, f: import('../types').Financeiro) => s + f.valor, 0)
  const totalPendente = mockFinanceiro.filter((f: import('../types').Financeiro) => f.status === 'pendente').reduce((s: number, f: import('../types').Financeiro) => s + f.valor, 0)
  const totalVencido = mockFinanceiro.filter((f: import('../types').Financeiro) => f.status === 'vencido').reduce((s: number, f: import('../types').Financeiro) => s + f.valor, 0)

  return (
    <div className="space-y-4 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards' }}>
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: 'Recebido', value: totalPago, icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', badge: 'badge-green' },
          { label: 'Pendente', value: totalPendente, icon: Clock, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20', badge: 'badge-orange' },
          { label: 'Vencido', value: totalVencido, icon: AlertCircle, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20', badge: 'badge-red' },
        ].map((item, i) => (
          <div key={i} className={`card border ${item.bg} p-4 animate-slide-up opacity-0`} style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}>
            <div className="flex items-center justify-between mb-3">
              <item.icon size={18} className={item.color} />
              <span className={`badge ${item.badge}`}>{item.label}</span>
            </div>
            <p className={`font-display font-bold text-xl ${item.color}`}>{fmt(item.value)}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input className="input-field pl-9" placeholder="Buscar aluno ou descrição..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {(['todos', 'pago', 'pendente', 'vencido'] as FilterStatus[]).map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 capitalize ${filterStatus === s ? 'bg-brand-500 text-white' : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'}`}
            >
              {s}
            </button>
          ))}
          <button className="btn-primary">
            <Plus size={14} />
            <span className="hidden sm:inline">Lançamento</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-4 py-3 text-white/30 text-xs font-medium uppercase tracking-wider">Aluno</th>
                <th className="text-left px-4 py-3 text-white/30 text-xs font-medium uppercase tracking-wider hidden sm:table-cell">Descrição</th>
                <th className="text-left px-4 py-3 text-white/30 text-xs font-medium uppercase tracking-wider hidden md:table-cell">Vencimento</th>
                <th className="text-right px-4 py-3 text-white/30 text-xs font-medium uppercase tracking-wider">Valor</th>
                <th className="text-left px-4 py-3 text-white/30 text-xs font-medium uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/3">
              {filtered.map(f => (
                <tr key={f.id} className="table-row-hover">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-brand-500/15 flex items-center justify-center text-brand-400 text-xs font-bold font-display flex-shrink-0">
                        {f.aluno.charAt(0)}
                      </div>
                      <span className="text-white text-sm font-medium">{f.aluno}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 hidden sm:table-cell">
                    <span className="text-white/50 text-sm">{f.descricao}</span>
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell">
                    <span className="text-white/40 text-sm font-mono">
                      {new Date(f.vencimento + 'T12:00:00').toLocaleDateString('pt-BR')}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="text-white font-mono font-medium text-sm">{fmt(f.valor)}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`badge ${f.status === 'pago' ? 'badge-green' : f.status === 'vencido' ? 'badge-red' : 'badge-orange'}`}>
                      {f.status === 'pago' ? 'Pago' : f.status === 'pendente' ? 'Pendente' : 'Vencido'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-white/30">
            <DollarSign size={32} className="mx-auto mb-3 opacity-40" />
            <p>Nenhum lançamento encontrado</p>
          </div>
        )}
      </div>
    </div>
  )
}
