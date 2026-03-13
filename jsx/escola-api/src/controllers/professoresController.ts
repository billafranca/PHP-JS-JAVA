import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import db from '../database/db'

export const listar = async (req: Request, res: Response) => {
  const { busca, status } = req.query
  let q = db('professores')
  if (busca) q = q.whereILike('nome', `%${busca}%`)
  if (status) q = q.where({ status })
  const profs = await q.orderBy('nome')
  const result = await Promise.all(profs.map(async p => {
    const disciplinas = await db('disciplinas').where({ professor_id: p.id }).pluck('nome')
    const turmas = await db('turmas').where({ professor_id: p.id }).pluck('nome')
    return { ...p, disciplinas, turmas }
  }))
  return res.json(result)
}

export const buscarPorId = async (req: Request, res: Response) => {
  const prof = await db('professores').where({ id: req.params.id }).first()
  if (!prof) return res.status(404).json({ erro: 'Professor não encontrado' })
  const disciplinas = await db('disciplinas').where({ professor_id: req.params.id })
  const turmas = await db('turmas').where({ professor_id: req.params.id })
  return res.json({ ...prof, disciplinas, turmas })
}

export const criar = async (req: Request, res: Response) => {
  const { nome, email, telefone, status, carga_horaria } = req.body
  if (!nome || !email) return res.status(400).json({ erro: 'Nome e e-mail são obrigatórios' })
  const existe = await db('professores').where({ email }).first()
  if (existe) return res.status(409).json({ erro: 'E-mail já cadastrado' })
  const id = uuid()
  await db('professores').insert({ id, nome, email, telefone: telefone||null, status: status||'ativo', carga_horaria: carga_horaria||40 })
  return res.status(201).json(await db('professores').where({ id }).first())
}

export const atualizar = async (req: Request, res: Response) => {
  const prof = await db('professores').where({ id: req.params.id }).first()
  if (!prof) return res.status(404).json({ erro: 'Professor não encontrado' })
  const { nome, email, telefone, status, carga_horaria } = req.body
  const upd: any = {}
  if (nome !== undefined) upd.nome = nome
  if (email !== undefined) upd.email = email
  if (telefone !== undefined) upd.telefone = telefone
  if (status !== undefined) upd.status = status
  if (carga_horaria !== undefined) upd.carga_horaria = carga_horaria
  await db('professores').where({ id: req.params.id }).update(upd)
  return res.json(await db('professores').where({ id: req.params.id }).first())
}

export const deletar = async (req: Request, res: Response) => {
  const prof = await db('professores').where({ id: req.params.id }).first()
  if (!prof) return res.status(404).json({ erro: 'Professor não encontrado' })
  await db('professores').where({ id: req.params.id }).delete()
  return res.json({ mensagem: 'Professor removido com sucesso' })
}
