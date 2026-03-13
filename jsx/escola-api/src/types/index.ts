export interface Usuario {
  id: string
  nome: string
  email: string
  senha: string
  role: 'admin' | 'secretaria' | 'professor'
  ativo: boolean
  criado_em: string
}

export interface Aluno {
  id: string
  nome: string
  matricula: string
  turma_id: string
  email: string
  telefone: string
  responsavel: string
  data_nascimento: string
  status: 'ativo' | 'inativo' | 'transferido'
  mensalidade: 'em_dia' | 'atrasada' | 'isenta'
  foto?: string
  criado_em: string
}

export interface Professor {
  id: string
  nome: string
  email: string
  telefone: string
  status: 'ativo' | 'afastado'
  carga_horaria: number
  criado_em: string
}

export interface Turma {
  id: string
  nome: string
  serie: string
  turno: 'manhã' | 'tarde' | 'noite' | 'integral'
  capacidade: number
  sala: string
  professor_id: string
  criado_em: string
}

export interface Disciplina {
  id: string
  nome: string
  professor_id: string
}

export interface Nota {
  id: string
  aluno_id: string
  disciplina_id: string
  bimestre: number
  valor: number
  criado_em: string
}

export interface Frequencia {
  id: string
  aluno_id: string
  turma_id: string
  data: string
  presente: boolean
}

export interface Financeiro {
  id: string
  aluno_id: string
  descricao: string
  valor: number
  vencimento: string
  status: 'pago' | 'pendente' | 'vencido'
  tipo: 'mensalidade' | 'taxa' | 'material'
  pago_em?: string
  criado_em: string
}

export interface Comunicado {
  id: string
  titulo: string
  conteudo: string
  autor_id: string
  destinatarios: string
  prioridade: 'normal' | 'urgente' | 'info'
  criado_em: string
}

export interface JwtPayload {
  id: string
  email: string
  role: string
  nome: string
}

declare global {
  namespace Express {
    interface Request {
      usuario?: JwtPayload
    }
  }
}
