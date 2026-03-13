import type { Aluno, Professor, Turma, Financeiro, Comunicado, DashboardStats } from '../types'

export const mockAlunos: Aluno[] = [
  { id: '1', nome: 'Ana Clara Souza', matricula: '2024001', turma: '9A', serie: '9º Ano', status: 'ativo', email: 'ana@email.com', telefone: '(11) 99999-0001', responsavel: 'Maria Souza', dataNascimento: '2010-03-15', notas: [{disciplina:'Matemática',bimestre:1,valor:8.5},{disciplina:'Português',bimestre:1,valor:9.0}], frequencia: 95, mensalidade: 'em_dia' },
  { id: '2', nome: 'Bruno Henrique Lima', matricula: '2024002', turma: '8B', serie: '8º Ano', status: 'ativo', email: 'bruno@email.com', telefone: '(11) 99999-0002', responsavel: 'Carlos Lima', dataNascimento: '2011-07-22', notas: [{disciplina:'Matemática',bimestre:1,valor:7.0},{disciplina:'Português',bimestre:1,valor:6.5}], frequencia: 88, mensalidade: 'atrasada' },
  { id: '3', nome: 'Camila Rodrigues', matricula: '2024003', turma: '7A', serie: '7º Ano', status: 'ativo', email: 'camila@email.com', telefone: '(11) 99999-0003', responsavel: 'Paula Rodrigues', dataNascimento: '2012-01-08', notas: [{disciplina:'Matemática',bimestre:1,valor:9.5},{disciplina:'Português',bimestre:1,valor:8.0}], frequencia: 98, mensalidade: 'em_dia' },
  { id: '4', nome: 'Diego Ferreira', matricula: '2024004', turma: '6C', serie: '6º Ano', status: 'ativo', email: 'diego@email.com', telefone: '(11) 99999-0004', responsavel: 'José Ferreira', dataNascimento: '2013-05-30', notas: [{disciplina:'Matemática',bimestre:1,valor:5.0},{disciplina:'Português',bimestre:1,valor:7.5}], frequencia: 72, mensalidade: 'atrasada' },
  { id: '5', nome: 'Eduarda Martins', matricula: '2024005', turma: '9A', serie: '9º Ano', status: 'ativo', email: 'edu@email.com', telefone: '(11) 99999-0005', responsavel: 'Roberto Martins', dataNascimento: '2010-11-14', notas: [{disciplina:'Matemática',bimestre:1,valor:8.0},{disciplina:'Português',bimestre:1,valor:9.5}], frequencia: 92, mensalidade: 'em_dia' },
  { id: '6', nome: 'Felipe Nascimento', matricula: '2024006', turma: '8B', serie: '8º Ano', status: 'inativo', email: 'felipe@email.com', telefone: '(11) 99999-0006', responsavel: 'Sandra Nascimento', dataNascimento: '2011-09-03', notas: [], frequencia: 45, mensalidade: 'atrasada' },
  { id: '7', nome: 'Gabriela Costa', matricula: '2024007', turma: '7A', serie: '7º Ano', status: 'ativo', email: 'gabi@email.com', telefone: '(11) 99999-0007', responsavel: 'Ana Costa', dataNascimento: '2012-06-19', notas: [{disciplina:'Matemática',bimestre:1,valor:10.0},{disciplina:'Português',bimestre:1,valor:9.0}], frequencia: 100, mensalidade: 'em_dia' },
  { id: '8', nome: 'Henrique Oliveira', matricula: '2024008', turma: '6C', serie: '6º Ano', status: 'ativo', email: 'henrique@email.com', telefone: '(11) 99999-0008', responsavel: 'Marcos Oliveira', dataNascimento: '2013-12-25', notas: [{disciplina:'Matemática',bimestre:1,valor:7.5},{disciplina:'Português',bimestre:1,valor:8.0}], frequencia: 85, mensalidade: 'isenta' },
  { id: '9', nome: 'Isabela Santos', matricula: '2024009', turma: '9A', serie: '9º Ano', status: 'ativo', email: 'isa@email.com', telefone: '(11) 99999-0009', responsavel: 'Lucia Santos', dataNascimento: '2010-04-07', notas: [{disciplina:'Matemática',bimestre:1,valor:6.0},{disciplina:'Português',bimestre:1,valor:7.0}], frequencia: 79, mensalidade: 'em_dia' },
  { id: '10', nome: 'João Pedro Alves', matricula: '2024010', turma: '8B', serie: '8º Ano', status: 'transferido', email: 'joao@email.com', telefone: '(11) 99999-0010', responsavel: 'Fernanda Alves', dataNascimento: '2011-02-28', notas: [], frequencia: 60, mensalidade: 'em_dia' },
]

export const mockProfessores: Professor[] = [
  { id: '1', nome: 'Prof. Ricardo Mendes', email: 'ricardo@escola.com', telefone: '(11) 98888-0001', disciplinas: ['Matemática', 'Física'], turmas: ['9A', '8B', '7A'], status: 'ativo', cargaHoraria: 40 },
  { id: '2', nome: 'Profa. Silvia Batista', email: 'silvia@escola.com', telefone: '(11) 98888-0002', disciplinas: ['Português', 'Literatura'], turmas: ['9A', '6C'], status: 'ativo', cargaHoraria: 36 },
  { id: '3', nome: 'Prof. Eduardo Pinto', email: 'eduardo@escola.com', telefone: '(11) 98888-0003', disciplinas: ['História', 'Geografia'], turmas: ['8B', '7A'], status: 'ativo', cargaHoraria: 32 },
  { id: '4', nome: 'Profa. Mariana Luz', email: 'mariana@escola.com', telefone: '(11) 98888-0004', disciplinas: ['Ciências', 'Biologia'], turmas: ['6C', '7A'], status: 'afastado', cargaHoraria: 28 },
  { id: '5', nome: 'Prof. André Campos', email: 'andre@escola.com', telefone: '(11) 98888-0005', disciplinas: ['Educação Física'], turmas: ['9A', '8B', '7A', '6C'], status: 'ativo', cargaHoraria: 40 },
]

export const mockTurmas: Turma[] = [
  { id: '1', nome: '9º Ano A', serie: '9º Ano', turno: 'manhã', totalAlunos: 32, capacidade: 35, professor: 'Prof. Ricardo Mendes', sala: 'Sala 01' },
  { id: '2', nome: '8º Ano B', serie: '8º Ano', turno: 'manhã', totalAlunos: 28, capacidade: 35, professor: 'Profa. Silvia Batista', sala: 'Sala 02' },
  { id: '3', nome: '7º Ano A', serie: '7º Ano', turno: 'tarde', totalAlunos: 30, capacidade: 35, professor: 'Prof. Eduardo Pinto', sala: 'Sala 03' },
  { id: '4', nome: '6º Ano C', serie: '6º Ano', turno: 'tarde', totalAlunos: 25, capacidade: 35, professor: 'Profa. Mariana Luz', sala: 'Sala 04' },
  { id: '5', nome: '5º Ano A', serie: '5º Ano', turno: 'integral', totalAlunos: 22, capacidade: 30, professor: 'Prof. André Campos', sala: 'Sala 05' },
]

export const mockFinanceiro: Financeiro[] = [
  { id: '1', aluno: 'Ana Clara Souza', descricao: 'Mensalidade Março/2025', valor: 1200, vencimento: '2025-03-10', status: 'pago', tipo: 'mensalidade' },
  { id: '2', aluno: 'Bruno Henrique Lima', descricao: 'Mensalidade Março/2025', valor: 1200, vencimento: '2025-03-10', status: 'vencido', tipo: 'mensalidade' },
  { id: '3', aluno: 'Camila Rodrigues', descricao: 'Mensalidade Março/2025', valor: 1200, vencimento: '2025-03-10', status: 'pago', tipo: 'mensalidade' },
  { id: '4', aluno: 'Diego Ferreira', descricao: 'Mensalidade Março/2025', valor: 1200, vencimento: '2025-03-10', status: 'pendente', tipo: 'mensalidade' },
  { id: '5', aluno: 'Eduarda Martins', descricao: 'Taxa de Material', valor: 350, vencimento: '2025-02-28', status: 'pago', tipo: 'taxa' },
  { id: '6', aluno: 'Gabriela Costa', descricao: 'Mensalidade Março/2025', valor: 1200, vencimento: '2025-03-10', status: 'pago', tipo: 'mensalidade' },
  { id: '7', aluno: 'Henrique Oliveira', descricao: 'Mensalidade Março/2025', valor: 0, vencimento: '2025-03-10', status: 'pago', tipo: 'mensalidade' },
  { id: '8', aluno: 'Isabela Santos', descricao: 'Mensalidade Fevereiro/2025', valor: 1200, vencimento: '2025-02-10', status: 'vencido', tipo: 'mensalidade' },
]

export const mockComunicados: Comunicado[] = [
  { id: '1', titulo: 'Reunião de Pais e Mestres', conteudo: 'Informamos que a Reunião de Pais e Mestres acontecerá no dia 20/03/2025 às 19h no auditório da escola. Sua presença é fundamental.', data: '2025-03-12', autor: 'Direção', destinatarios: ['todos'], lido: false, prioridade: 'urgente' },
  { id: '2', titulo: 'Calendário de Provas 1º Bimestre', conteudo: 'As provas do 1º bimestre acontecerão entre os dias 24 e 28 de março. Os alunos devem estar atentos ao horário de cada disciplina.', data: '2025-03-10', autor: 'Coordenação', destinatarios: ['alunos'], lido: true, prioridade: 'normal' },
  { id: '3', titulo: 'Feriado Municipal – 19/03', conteudo: 'Comunicamos que no dia 19 de março não haverá aulas em virtude do Feriado Municipal. As atividades serão retomadas normalmente na segunda-feira, dia 24.', data: '2025-03-08', autor: 'Secretaria', destinatarios: ['todos'], lido: false, prioridade: 'info' },
  { id: '4', titulo: 'Novo Sistema de Mensagens', conteudo: 'A partir desta semana, a escola passa a utilizar o novo sistema de comunicação EduPrime. Todos os comunicados serão enviados por aqui.', data: '2025-03-05', autor: 'TI', destinatarios: ['todos'], lido: true, prioridade: 'normal' },
]

export const mockDashboard: DashboardStats = {
  totalAlunos: 487,
  totalProfessores: 32,
  totalTurmas: 18,
  receitaMes: 584400,
  inadimplencia: 8.3,
  presencaMedia: 91.4,
  novosMes: 7,
}

export const mockChartMatriculas = [
  { mes: 'Set', alunos: 460 },
  { mes: 'Out', alunos: 463 },
  { mes: 'Nov', alunos: 461 },
  { mes: 'Dez', alunos: 458 },
  { mes: 'Jan', alunos: 471 },
  { mes: 'Fev', alunos: 480 },
  { mes: 'Mar', alunos: 487 },
]

export const mockChartReceita = [
  { mes: 'Set', receita: 552000, meta: 570000 },
  { mes: 'Out', receita: 558000, meta: 570000 },
  { mes: 'Nov', receita: 561000, meta: 570000 },
  { mes: 'Dez', receita: 545000, meta: 570000 },
  { mes: 'Jan', receita: 572000, meta: 580000 },
  { mes: 'Fev', receita: 576000, meta: 580000 },
  { mes: 'Mar', receita: 584400, meta: 585000 },
]

export const mockChartDesempenho = [
  { disciplina: 'Mat', media: 7.2 },
  { disciplina: 'Port', media: 7.8 },
  { disciplina: 'Cien', media: 7.5 },
  { disciplina: 'Hist', media: 8.1 },
  { disciplina: 'Geo', media: 7.9 },
  { disciplina: 'EF', media: 9.2 },
]
