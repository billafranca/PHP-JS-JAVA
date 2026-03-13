import db, { migrate } from './db'
import bcrypt from 'bcryptjs'
import { v4 as uuid } from 'uuid'
import dotenv from 'dotenv'

dotenv.config()

async function seed() {
  await migrate()
  console.log('🌱 Iniciando seed...')

  // Usuários
  const senhaAdmin = bcrypt.hashSync('admin123', 10)
  const senhaSec   = bcrypt.hashSync('sec123', 10)
  const adminId    = uuid()
  const secId      = uuid()

  await db('usuarios').insert([
    { id: adminId, nome: 'Administrador', email: 'admin@eduprime.com', senha: senhaAdmin, role: 'admin' },
    { id: secId,   nome: 'Secretaria',    email: 'secretaria@eduprime.com', senha: senhaSec, role: 'secretaria' },
  ]).onConflict('email').ignore()
  console.log('✅ Usuários criados')

  // Professores
  const profs = [
    { id: uuid(), nome: 'Prof. Ricardo Mendes',  email: 'ricardo@escola.com', telefone: '(11) 98888-0001', status: 'ativo',    carga_horaria: 40 },
    { id: uuid(), nome: 'Profa. Silvia Batista',  email: 'silvia@escola.com',  telefone: '(11) 98888-0002', status: 'ativo',    carga_horaria: 36 },
    { id: uuid(), nome: 'Prof. Eduardo Pinto',    email: 'eduardo@escola.com', telefone: '(11) 98888-0003', status: 'ativo',    carga_horaria: 32 },
    { id: uuid(), nome: 'Profa. Mariana Luz',     email: 'mariana@escola.com', telefone: '(11) 98888-0004', status: 'afastado', carga_horaria: 28 },
    { id: uuid(), nome: 'Prof. André Campos',     email: 'andre@escola.com',   telefone: '(11) 98888-0005', status: 'ativo',    carga_horaria: 40 },
  ]
  await db('professores').insert(profs).onConflict('email').ignore()
  console.log('✅ Professores criados')

  // Turmas
  const turmas = [
    { id: uuid(), nome: '9º Ano A', serie: '9º Ano', turno: 'manhã',    capacidade: 35, sala: 'Sala 01', professor_id: profs[0].id },
    { id: uuid(), nome: '8º Ano B', serie: '8º Ano', turno: 'manhã',    capacidade: 35, sala: 'Sala 02', professor_id: profs[1].id },
    { id: uuid(), nome: '7º Ano A', serie: '7º Ano', turno: 'tarde',    capacidade: 35, sala: 'Sala 03', professor_id: profs[2].id },
    { id: uuid(), nome: '6º Ano C', serie: '6º Ano', turno: 'tarde',    capacidade: 35, sala: 'Sala 04', professor_id: profs[3].id },
    { id: uuid(), nome: '5º Ano A', serie: '5º Ano', turno: 'integral', capacidade: 30, sala: 'Sala 05', professor_id: profs[4].id },
  ]
  await db('turmas').insert(turmas).onConflict('id').ignore()
  console.log('✅ Turmas criadas')

  // Alunos
  const alunos = [
    { id: uuid(), nome: 'Ana Clara Souza',      matricula: '2024001', turma_id: turmas[0].id, email: 'ana@email.com',     telefone: '(11) 99999-0001', responsavel: 'Maria Souza',      data_nascimento: '2010-03-15', status: 'ativo',      mensalidade: 'em_dia'  },
    { id: uuid(), nome: 'Bruno Henrique Lima',  matricula: '2024002', turma_id: turmas[1].id, email: 'bruno@email.com',   telefone: '(11) 99999-0002', responsavel: 'Carlos Lima',      data_nascimento: '2011-07-22', status: 'ativo',      mensalidade: 'atrasada'},
    { id: uuid(), nome: 'Camila Rodrigues',     matricula: '2024003', turma_id: turmas[2].id, email: 'camila@email.com',  telefone: '(11) 99999-0003', responsavel: 'Paula Rodrigues',  data_nascimento: '2012-01-08', status: 'ativo',      mensalidade: 'em_dia'  },
    { id: uuid(), nome: 'Diego Ferreira',       matricula: '2024004', turma_id: turmas[3].id, email: 'diego@email.com',   telefone: '(11) 99999-0004', responsavel: 'José Ferreira',    data_nascimento: '2013-05-30', status: 'ativo',      mensalidade: 'atrasada'},
    { id: uuid(), nome: 'Eduarda Martins',      matricula: '2024005', turma_id: turmas[0].id, email: 'edu@email.com',     telefone: '(11) 99999-0005', responsavel: 'Roberto Martins',  data_nascimento: '2010-11-14', status: 'ativo',      mensalidade: 'em_dia'  },
    { id: uuid(), nome: 'Felipe Nascimento',    matricula: '2024006', turma_id: turmas[1].id, email: 'felipe@email.com',  telefone: '(11) 99999-0006', responsavel: 'Sandra Nascimento',data_nascimento: '2011-09-03', status: 'inativo',    mensalidade: 'atrasada'},
    { id: uuid(), nome: 'Gabriela Costa',       matricula: '2024007', turma_id: turmas[2].id, email: 'gabi@email.com',    telefone: '(11) 99999-0007', responsavel: 'Ana Costa',        data_nascimento: '2012-06-19', status: 'ativo',      mensalidade: 'em_dia'  },
    { id: uuid(), nome: 'Henrique Oliveira',    matricula: '2024008', turma_id: turmas[3].id, email: 'henrique@email.com',telefone: '(11) 99999-0008', responsavel: 'Marcos Oliveira',  data_nascimento: '2013-12-25', status: 'ativo',      mensalidade: 'isenta'  },
    { id: uuid(), nome: 'Isabela Santos',       matricula: '2024009', turma_id: turmas[0].id, email: 'isa@email.com',     telefone: '(11) 99999-0009', responsavel: 'Lucia Santos',     data_nascimento: '2010-04-07', status: 'ativo',      mensalidade: 'em_dia'  },
    { id: uuid(), nome: 'João Pedro Alves',     matricula: '2024010', turma_id: turmas[1].id, email: 'joao@email.com',    telefone: '(11) 99999-0010', responsavel: 'Fernanda Alves',   data_nascimento: '2011-02-28', status: 'transferido',mensalidade: 'em_dia'  },
  ]
  await db('alunos').insert(alunos).onConflict('matricula').ignore()
  console.log('✅ Alunos criados')

  // Disciplinas
  const discs = [
    { id: uuid(), nome: 'Matemática',       professor_id: profs[0].id },
    { id: uuid(), nome: 'Português',        professor_id: profs[1].id },
    { id: uuid(), nome: 'História',         professor_id: profs[2].id },
    { id: uuid(), nome: 'Geografia',        professor_id: profs[2].id },
    { id: uuid(), nome: 'Ciências',         professor_id: profs[3].id },
    { id: uuid(), nome: 'Educação Física',  professor_id: profs[4].id },
  ]
  await db('disciplinas').insert(discs).onConflict('id').ignore()
  console.log('✅ Disciplinas criadas')

  // Notas
  const notasRows: any[] = []
  const notasData = [
    [alunos[0].id, 8.5, 9.0, 7.5, 8.0],
    [alunos[1].id, 7.0, 6.5, 7.0, 6.0],
    [alunos[2].id, 9.5, 8.0, 8.5, 9.0],
    [alunos[3].id, 5.0, 7.5, 6.0, 7.0],
    [alunos[4].id, 8.0, 9.5, 8.0, 9.0],
    [alunos[6].id,10.0, 9.0, 9.5,10.0],
    [alunos[7].id, 7.5, 8.0, 7.0, 8.5],
    [alunos[8].id, 6.0, 7.0, 6.5, 7.0],
  ]
  notasData.forEach(([aid, mat, port, hist, geo]) => {
    notasRows.push({ id: uuid(), aluno_id: aid, disciplina_id: discs[0].id, bimestre: 1, valor: mat  })
    notasRows.push({ id: uuid(), aluno_id: aid, disciplina_id: discs[1].id, bimestre: 1, valor: port })
    notasRows.push({ id: uuid(), aluno_id: aid, disciplina_id: discs[2].id, bimestre: 1, valor: hist })
    notasRows.push({ id: uuid(), aluno_id: aid, disciplina_id: discs[3].id, bimestre: 1, valor: geo  })
  })
  await db('notas').insert(notasRows).onConflict(['aluno_id','disciplina_id','bimestre']).ignore()
  console.log('✅ Notas criadas')

  // Frequências (últimos 20 dias úteis)
  const freqRows: any[] = []
  const hoje = new Date()
  for (let i = 0; i < 20; i++) {
    const d = new Date(hoje); d.setDate(hoje.getDate() - i)
    if (d.getDay() === 0 || d.getDay() === 6) continue
    const data = d.toISOString().split('T')[0]
    alunos.filter(a => a.status === 'ativo').forEach(a => {
      freqRows.push({ id: uuid(), aluno_id: a.id, turma_id: a.turma_id, data, presente: Math.random() > 0.1 ? 1 : 0 })
    })
  }
  await db('frequencias').insert(freqRows).onConflict(['aluno_id','data']).ignore()
  console.log('✅ Frequências criadas')

  // Financeiro
  const finRows: any[] = []
  const meses = [['Janeiro','2025-01-10'],['Fevereiro','2025-02-10'],['Março','2025-03-10']]
  alunos.forEach(a => {
    meses.forEach(([mes, venc], idx) => {
      const pago = a.mensalidade === 'isenta' || a.mensalidade === 'em_dia' || idx < 2
      finRows.push({
        id: uuid(), aluno_id: a.id,
        descricao: `Mensalidade ${mes}/2025`,
        valor: a.mensalidade === 'isenta' ? 0 : 1200,
        vencimento: venc,
        status: a.mensalidade === 'isenta' ? 'pago' : pago ? 'pago' : a.mensalidade === 'atrasada' ? 'vencido' : 'pendente',
        tipo: 'mensalidade',
        pago_em: pago ? venc : null,
      })
    })
  })
  await db('financeiro').insert(finRows).onConflict('id').ignore()
  console.log('✅ Financeiro criado')

  // Comunicados
  await db('comunicados').insert([
    { id: uuid(), titulo: 'Reunião de Pais e Mestres',     conteudo: 'A Reunião de Pais e Mestres acontecerá no dia 20/03/2025 às 19h no auditório da escola.', autor_id: adminId, destinatarios: 'todos',  prioridade: 'urgente', criado_em: '2025-03-12 10:00:00' },
    { id: uuid(), titulo: 'Calendário de Provas 1º Bim',   conteudo: 'As provas do 1º bimestre acontecerão entre os dias 24 e 28 de março.',                     autor_id: adminId, destinatarios: 'alunos', prioridade: 'normal',  criado_em: '2025-03-10 09:00:00' },
    { id: uuid(), titulo: 'Feriado Municipal – 19/03',     conteudo: 'Não haverá aulas no dia 19 de março em virtude do Feriado Municipal.',                      autor_id: adminId, destinatarios: 'todos',  prioridade: 'info',    criado_em: '2025-03-08 14:00:00' },
    { id: uuid(), titulo: 'Novo Sistema EduPrime',         conteudo: 'A escola passa a utilizar o novo sistema EduPrime para comunicação.',                       autor_id: adminId, destinatarios: 'todos',  prioridade: 'normal',  criado_em: '2025-03-05 08:00:00' },
  ]).onConflict('id').ignore()
  console.log('✅ Comunicados criados')

  console.log('\n🎉 Seed concluído!')
  console.log('─────────────────────────────────')
  console.log('Login admin:      admin@eduprime.com  /  admin123')
  console.log('Login secretaria: secretaria@eduprime.com  /  sec123')
  console.log('─────────────────────────────────')
  await db.destroy()
}

seed().catch(e => { console.error(e); process.exit(1) })
