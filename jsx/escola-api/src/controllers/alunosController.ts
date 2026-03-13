import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import db from '../database/db'

export const listar = async (req: Request, res: Response) => {
  const { busca, status, mensalidade, turma_id } = req.query
  let q = db('alunos as a').leftJoin('turmas as t','a.turma_id','t.id')
    .select('a.*','t.nome as turma_nome','t.serie')
  if (busca) q = q.where(w => w.whereILike('a.nome',`%${busca}%`).orWhereILike('a.matricula',`%${busca}%`).orWhereILike('t.nome',`%${busca}%`))
  if (status) q = q.where('a.status', status)
  if (mensalidade) q = q.where('a.mensalidade', mensalidade)
  if (turma_id) q = q.where('a.turma_id', turma_id)
  return res.json(await q.orderBy('a.nome'))
}

export const buscarPorId = async (req: Request, res: Response) => {
  const aluno = await db('alunos as a').leftJoin('turmas as t','a.turma_id','t.id')
    .select('a.*','t.nome as turma_nome','t.serie').where('a.id', req.params.id).first()
  if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado' })

  const notas = await db('notas as n').join('disciplinas as d','n.disciplina_id','d.id')
    .select('n.*','d.nome as disciplina_nome').where('n.aluno_id', req.params.id).orderBy('n.bimestre')

  const freq = await db('frequencias').where('aluno_id', req.params.id)
    .select(db.raw('COUNT(*) as total'), db.raw('SUM(presente) as presentes')).first() as any
  const frequencia = freq?.total > 0 ? Math.round((freq.presentes / freq.total) * 100) : 0

  return res.json({ ...aluno, notas, frequencia })
}

export const criar = async (req: Request, res: Response) => {
  const { nome, matricula, turma_id, email, telefone, responsavel, data_nascimento, status, mensalidade } = req.body
  if (!nome || !matricula) return res.status(400).json({ erro: 'Nome e matrícula são obrigatórios' })
  const existe = await db('alunos').where({ matricula }).first()
  if (existe) return res.status(409).json({ erro: 'Matrícula já cadastrada.' })
  const id = uuid()
  await db('alunos').insert({ id, nome, matricula, turma_id: turma_id||null, email: email||null, telefone: telefone||null, responsavel: responsavel||null, data_nascimento: data_nascimento||null, status: status||'ativo', mensalidade: mensalidade||'em_dia' })
  return res.status(201).json(await db('alunos').where({ id }).first())
}

export const atualizar = async (req: Request, res: Response) => {
  const aluno = await db('alunos').where({ id: req.params.id }).first()
  if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado' })
  const { nome, turma_id, email, telefone, responsavel, data_nascimento, status, mensalidade } = req.body
  const upd: any = {}
  if (nome !== undefined) upd.nome = nome
  if (turma_id !== undefined) upd.turma_id = turma_id
  if (email !== undefined) upd.email = email
  if (telefone !== undefined) upd.telefone = telefone
  if (responsavel !== undefined) upd.responsavel = responsavel
  if (data_nascimento !== undefined) upd.data_nascimento = data_nascimento
  if (status !== undefined) upd.status = status
  if (mensalidade !== undefined) upd.mensalidade = mensalidade
  await db('alunos').where({ id: req.params.id }).update(upd)
  return res.json(await db('alunos').where({ id: req.params.id }).first())
}

export const deletar = async (req: Request, res: Response) => {
  const aluno = await db('alunos').where({ id: req.params.id }).first()
  if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado' })
  await db('alunos').where({ id: req.params.id }).delete()
  return res.json({ mensagem: 'Aluno removido com sucesso' })
}

export const notasAluno = async (req: Request, res: Response) => {
  const notas = await db('notas as n').join('disciplinas as d','n.disciplina_id','d.id')
    .select('n.*','d.nome as disciplina_nome').where('n.aluno_id', req.params.id).orderBy(['n.bimestre','d.nome'])
  return res.json(notas)
}

export const lancarNota = async (req: Request, res: Response) => {
  const { disciplina_id, bimestre, valor } = req.body
  if (valor < 0 || valor > 10) return res.status(400).json({ erro: 'Nota deve ser entre 0 e 10' })
  await db('notas').insert({ id: uuid(), aluno_id: req.params.id, disciplina_id, bimestre, valor })
    .onConflict(['aluno_id','disciplina_id','bimestre']).merge({ valor })
  return res.status(201).json({ mensagem: 'Nota lançada com sucesso' })
}
