import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Users, GraduationCap, BookOpen,
  DollarSign, Bell, Settings, ChevronRight, X, School
} from 'lucide-react'
import { useApp } from '../../contexts/AppContext'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
  { icon: Users, label: 'Alunos', to: '/alunos' },
  { icon: GraduationCap, label: 'Professores', to: '/professores' },
  { icon: BookOpen, label: 'Turmas', to: '/turmas' },
  { icon: DollarSign, label: 'Financeiro', to: '/financeiro' },
  { icon: Bell, label: 'Comunicados', to: '/comunicados' },
]

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useApp()
  const location = useLocation()

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50 flex flex-col
          bg-[#0d1018] border-r border-white/5
          transition-transform duration-300 ease-in-out
          w-[260px]
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center glow-blue">
              <School size={18} className="text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-white text-base leading-none">EduPrime</h1>
              <p className="text-white/30 text-[10px] mt-0.5 font-body">Sistema Escolar</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden w-7 h-7 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          <p className="text-white/20 text-[10px] font-display uppercase tracking-widest px-3 mb-3">Menu Principal</p>
          {navItems.map(({ icon: Icon, label, to }) => {
            const active = location.pathname === to || (to !== '/' && location.pathname.startsWith(to))
            return (
              <NavLink
                key={to}
                to={to}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group relative
                  ${active
                    ? 'bg-brand-500/15 text-brand-400'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-brand-400 rounded-full" />
                )}
                <Icon size={17} className={active ? 'text-brand-400' : 'text-white/40 group-hover:text-white/70'} />
                <span className="font-body font-medium text-sm flex-1">{label}</span>
                {active && <ChevronRight size={13} className="text-brand-400/60" />}
              </NavLink>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-4 border-t border-white/5 pt-3">
          <NavLink
            to="/configuracoes"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all duration-150 group"
          >
            <Settings size={17} className="group-hover:text-white/70" />
            <span className="font-body font-medium text-sm">Configurações</span>
          </NavLink>

          <div className="mt-3 mx-1 p-3 rounded-xl bg-brand-500/10 border border-brand-500/20">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-400 font-display font-bold text-sm">A</div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium truncate">Admin Escola</p>
                <p className="text-white/30 text-[10px] truncate">admin@eduprime.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
