export interface Aluno {
  id: string
  nome: string
  matricula: string
  turma: string
  serie: string
  status: 'ativo' | 'inativo' | 'transferido'
  foto?: string
  email: string
  telefone: string
  responsavel: string
  dataNascimento: string
  notas: Nota[]
  frequencia: number
  mensalidade: 'em_dia' | 'atrasada' | 'isenta'
}

export interface Nota {
  disciplina: string
  bimestre: number
  valor: number
}

export interface Professor {
  id: string
  nome: string
  email: string
  telefone: string
  disciplinas: string[]
  turmas: string[]
  status: 'ativo' | 'afastado'
  foto?: string
  cargaHoraria: number
}

export interface Turma {
  id: string
  nome: string
  serie: string
  turno: 'manhã' | 'tarde' | 'noite' | 'integral'
  totalAlunos: number
  capacidade: number
  professor: string
  sala: string
}

export interface Financeiro {
  id: string
  aluno: string
  descricao: string
  valor: number
  vencimento: string
  status: 'pago' | 'pendente' | 'vencido'
  tipo: 'mensalidade' | 'taxa' | 'material'
}

export interface Comunicado {
  id: string
  titulo: string
  conteudo: string
  data: string
  autor: string
  destinatarios: string[]
  lido: boolean
  prioridade: 'normal' | 'urgente' | 'info'
}

export interface DashboardStats {
  totalAlunos: number
  totalProfessores: number
  totalTurmas: number
  receitaMes: number
  inadimplencia: number
  presencaMedia: number
  novosMes: number
}
