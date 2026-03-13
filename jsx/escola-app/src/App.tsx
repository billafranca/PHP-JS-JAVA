import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './contexts/AppContext'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Alunos from './pages/Alunos'
import Professores from './pages/Professores'
import Turmas from './pages/Turmas'
import Financeiro from './pages/Financeiro'
import Comunicados from './pages/Comunicados'
import Configuracoes from './pages/Configuracoes'

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="alunos" element={<Alunos />} />
            <Route path="professores" element={<Professores />} />
            <Route path="turmas" element={<Turmas />} />
            <Route path="financeiro" element={<Financeiro />} />
            <Route path="comunicados" element={<Comunicados />} />
            <Route path="configuracoes" element={<Configuracoes />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}
