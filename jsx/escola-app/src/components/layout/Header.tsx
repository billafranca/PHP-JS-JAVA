import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu, Search, Bell, Sun } from 'lucide-react'
import { useApp } from '../../contexts/AppContext'
import { mockComunicados } from '../../utils/mockData'

const pageNames: Record<string, string> = {
  '/': 'Dashboard',
  '/alunos': 'Alunos',
  '/professores': 'Professores',
  '/turmas': 'Turmas',
  '/financeiro': 'Financeiro',
  '/comunicados': 'Comunicados',
  '/configuracoes': 'Configurações',
}

export default function Header() {
  const { toggleSidebar } = useApp()
  const location = useLocation()
  const [searchOpen, setSearchOpen] = useState(false)

  const naoLidos = mockComunicados.filter(c => !c.lido).length
  const pageName = Object.entries(pageNames).find(([key]) =>
    key === '/' ? location.pathname === '/' : location.pathname.startsWith(key)
  )?.[1] ?? 'Página'

  return (
    <header className="sticky top-0 z-30 bg-[#0f1117]/80 backdrop-blur-md border-b border-white/5 px-4 lg:px-6 h-14 flex items-center gap-4">
      {/* Mobile menu */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors"
      >
        <Menu size={18} />
      </button>

      {/* Page title */}
      <div className="flex-1">
        <h2 className="font-display font-semibold text-white text-base">{pageName}</h2>
        <p className="text-white/30 text-xs font-body hidden sm:block">
          {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Search */}
      <div className="hidden md:flex">
        {searchOpen ? (
          <input
            autoFocus
            className="input-field w-52 h-9 text-xs"
            placeholder="Buscar aluno, turma..."
            onBlur={() => setSearchOpen(false)}
          />
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Search size={16} />
          </button>
        )}
      </div>

      {/* Notifications */}
      <button className="relative w-9 h-9 flex items-center justify-center rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-colors">
        <Bell size={16} />
        {naoLidos > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
        )}
      </button>

      {/* Theme toggle placeholder */}
      <button className="w-9 h-9 flex items-center justify-center rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-colors">
        <Sun size={16} />
      </button>
    </header>
  )
}
