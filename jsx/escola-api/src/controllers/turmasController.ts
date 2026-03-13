import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import db from '../database/db'

export const listar = async (req: Request, res: Response) => {
  const turmas = await db('turmas as t').leftJoin('professores as p','t.professor_id','p.id')
    .select('t.*','p.nome as professor_nome')
    .orderBy(['t.serie','t.nome'])
  const result = await Promise.all(turmas.map(async t => {
    const { count } = await db('alunos').where({ turma_id: t.id, status: 'ativo' }).count('id as count').first() as any
    return { ...t, total_alunos: Number(count) }
  }))
  return res.json(result)
}

export const buscarPorId = async (req: Request, res: Response) => {
  const turma = await db('turmas as t').leftJoin('professores as p','t.professor_id','p.id')
    .select('t.*','p.nome as professor_nome').where('t.id', req.params.id).first()
  if (!turma) return res.status(404).json({ erro: 'Turma não encontrada' })
  const alunos = await db('alunos').where({ turma_id: req.params.id, status: 'ativo' }).orderBy('nome')
  return res.json({ ...turma, alunos })
}

export const criar = async (req: Request, res: Response) => {
  const { nome, serie, turno, capacidade, sala, professor_id } = req.body
  if (!nome || !serie) return res.status(400).json({ erro: 'Nome e série são obrigatórios' })
  const id = uuid()
  await db('turmas').insert({ id, nome, serie, turno: turno||'manhã', capacidade: capacidade||35, sala: sala||'', professor_id: professor_id||null })
  return res.status(201).json(await db('turmas').where({ id }).first())
}

export const atualizar = async (req: Request, res: Response) => {
  const turma = await db('turmas').where({ id: req.params.id }).first()
  if (!turma) return res.status(404).json({ erro: 'Turma não encontrada' })
  const { nome, serie, turno, capacidade, sala, professor_id } = req.body
  const upd: any = {}
  if (nome !== undefined) upd.nome = nome
  if (serie !== undefined) upd.serie = serie
  if (turno !== undefined) upd.turno = turno
  if (capacidade !== undefined) upd.capacidade = capacidade
  if (sala !== undefined) upd.sala = sala
  if (professor_id !== undefined) upd.professor_id = professor_id
  await db('turmas').where({ id: req.params.id }).update(upd)
  return res.json(await db('turmas').where({ id: req.params.id }).first())
}

export const deletar = async (req: Request, res: Response) => {
  const turma = await db('turmas').where({ id: req.params.id }).first()
  if (!turma) return res.status(404).json({ erro: 'Turma não encontrada' })
  const { count } = await db('alunos').where({ turma_id: req.params.id }).count('id as count').first() as any
  if (Number(count) > 0) return res.status(400).json({ erro: 'Não é possível remover turma com alunos' })
  await db('turmas').where({ id: req.params.id }).delete()
  return res.json({ mensagem: 'Turma removida com sucesso' })
}
