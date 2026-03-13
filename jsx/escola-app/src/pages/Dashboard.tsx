import React from 'react'
import {
  Users, GraduationCap, BookOpen, DollarSign,
  TrendingUp, TrendingDown, AlertCircle, CheckCircle,
  ArrowUpRight, UserPlus
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine
} from 'recharts'
import {
  mockDashboard, mockChartMatriculas, mockChartReceita, mockChartDesempenho,
  mockAlunos, mockComunicados
} from '../utils/mockData'

const fmt = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(v)

interface StatCardProps {
  icon: React.ElementType
  label: string
  value: string | number
  sub?: string
  trend?: 'up' | 'down' | 'neutral'
  trendVal?: string
  color: string
  delay?: number
}

function StatCard({ icon: Icon, label, value, sub, trend, trendVal, color, delay = 0 }: StatCardProps) {
  return (
    <div
      className="card-hover p-5 animate-slide-up opacity-0"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={18} />
        </div>
        {trend && trendVal && (
          <span className={`flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-rose-400' : 'text-white/40'}`}>
            {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trendVal}
          </span>
        )}
      </div>
      <p className="font-display font-bold text-2xl text-white mb-0.5">{value}</p>
      <p className="text-white/50 text-xs font-body">{label}</p>
      {sub && <p className="text-white/30 text-[11px] mt-1">{sub}</p>}
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="glass rounded-xl px-3 py-2 text-xs">
        <p className="text-white/50 mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }} className="font-medium">
            {p.name}: {typeof p.value === 'number' && p.value > 1000 ? fmt(p.value) : p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  const s = mockDashboard
  const alunosInadimplentes = mockAlunos.filter(a => a.mensalidade === 'atrasada')
  const comunicadosNaoLidos = mockComunicados.filter(c => !c.lido)

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <StatCard icon={Users} label="Total de Alunos" value={s.totalAlunos} trendVal="+7 este mês" trend="up" color="bg-brand-500/15 text-brand-400" delay={0} />
        <StatCard icon={GraduationCap} label="Professores" value={s.totalProfessores} sub="2 em férias" color="bg-emerald-500/15 text-emerald-400" delay={100} />
        <StatCard icon={BookOpen} label="Turmas Ativas" value={s.totalTurmas} sub="Manhã, tarde e noite" color="bg-orange-500/15 text-orange-400" delay={200} />
        <StatCard icon={DollarSign} label="Receita do Mês" value={fmt(s.receitaMes)} trendVal="+2.1%" trend="up" color="bg-purple-500/15 text-purple-400" delay={300} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Receita Chart */}
        <div className="lg:col-span-2 card p-5 animate-fade-in opacity-0 animate-delay-200" style={{ animationFillMode: 'forwards' }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-display font-semibold text-white text-sm">Receita Mensal</h3>
              <p className="text-white/30 text-xs mt-0.5">vs Meta do período</p>
            </div>
            <span className="badge-green">
              <CheckCircle size={10} />
              99.8% da meta
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={mockChartReceita} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradReceita" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4361ee" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#4361ee" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradMeta" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="mes" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="meta" name="Meta" stroke="#f97316" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#gradMeta)" dot={false} />
              <Area type="monotone" dataKey="receita" name="Receita" stroke="#4361ee" strokeWidth={2} fill="url(#gradReceita)" dot={false} activeDot={{ r: 4, fill: '#4361ee', strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Desempenho Radar */}
        <div className="card p-5 animate-fade-in opacity-0 animate-delay-300" style={{ animationFillMode: 'forwards' }}>
          <div className="mb-5">
            <h3 className="font-display font-semibold text-white text-sm">Desempenho por Disciplina</h3>
            <p className="text-white/30 text-xs mt-0.5">Média geral 1º Bimestre</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={mockChartDesempenho}>
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis dataKey="disciplina" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
              <Radar name="Média" dataKey="media" stroke="#4361ee" fill="#4361ee" fillOpacity={0.2} strokeWidth={2} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Matriculas + Secondary info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Evolução de Matrículas */}
        <div className="card p-5 animate-fade-in opacity-0 animate-delay-300" style={{ animationFillMode: 'forwards' }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-display font-semibold text-white text-sm">Matrículas</h3>
              <p className="text-white/30 text-xs mt-0.5">Evolução semestral</p>
            </div>
            <span className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
              <ArrowUpRight size={12} />
              +5.9%
            </span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={mockChartMatriculas} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="mes" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} domain={[440, 500]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="alunos" name="Alunos" fill="#4361ee" radius={[4, 4, 0, 0]} maxBarSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Inadimplentes */}
        <div className="card p-5 animate-fade-in opacity-0 animate-delay-400" style={{ animationFillMode: 'forwards' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-white text-sm">Inadimplência</h3>
            <span className="badge-red">
              <AlertCircle size={10} />
              {s.inadimplencia}%
            </span>
          </div>
          <div className="space-y-3">
            {alunosInadimplentes.map(a => (
              <div key={a.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/3 hover:bg-white/5 transition-colors">
                <div className="w-7 h-7 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400 text-xs font-bold font-display">
                  {a.nome.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-medium truncate">{a.nome}</p>
                  <p className="text-white/30 text-[11px]">{a.turma} · {a.serie}</p>
                </div>
                <span className="text-rose-400 text-xs font-mono">R$1.200</span>
              </div>
            ))}
          </div>
        </div>

        {/* Comunicados recentes */}
        <div className="card p-5 animate-fade-in opacity-0 animate-delay-500" style={{ animationFillMode: 'forwards' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-white text-sm">Comunicados</h3>
            <span className="badge-blue">{comunicadosNaoLidos.length} novos</span>
          </div>
          <div className="space-y-3">
            {mockComunicados.slice(0, 4).map(c => (
              <div key={c.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/3 transition-colors cursor-pointer">
                <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                  c.prioridade === 'urgente' ? 'bg-rose-400' :
                  c.prioridade === 'info' ? 'bg-brand-400' : 'bg-white/20'
                } ${!c.lido ? 'animate-pulse-soft' : ''}`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-medium truncate ${c.lido ? 'text-white/50' : 'text-white'}`}>{c.titulo}</p>
                  <p className="text-white/25 text-[11px]">{c.autor} · {new Date(c.data).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Presença Média', value: `${s.presencaMedia}%`, color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: CheckCircle },
          { label: 'Inadimplência', value: `${s.inadimplencia}%`, color: 'text-rose-400', bg: 'bg-rose-500/10', icon: AlertCircle },
          { label: 'Novos Alunos', value: `+${s.novosMes}`, color: 'text-brand-400', bg: 'bg-brand-500/10', icon: UserPlus },
          { label: 'Taxa Ocupação', value: '92%', color: 'text-orange-400', bg: 'bg-orange-500/10', icon: BookOpen },
        ].map((item, i) => (
          <div key={i} className={`card p-4 flex items-center gap-3 animate-slide-up opacity-0`} style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'forwards' }}>
            <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center ${item.color}`}>
              <item.icon size={16} />
            </div>
            <div>
              <p className={`font-display font-bold text-lg ${item.color}`}>{item.value}</p>
              <p className="text-white/40 text-[11px]">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
