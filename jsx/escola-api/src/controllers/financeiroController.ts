import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import db from '../database/db'

export const listar = async (req: Request, res: Response) => {
  const { status, tipo, aluno_id, busca } = req.query
  let q = db('financeiro as f').join('alunos as a','f.aluno_id','a.id').select('f.*','a.nome as aluno_nome','a.matricula')
  if (status) q = q.where('f.status', status)
  if (tipo) q = q.where('f.tipo', tipo)
  if (aluno_id) q = q.where('f.aluno_id', aluno_id)
  if (busca) q = q.where(w => w.whereILike('a.nome',`%${busca}%`).orWhereILike('f.descricao',`%${busca}%`))
  return res.json(await q.orderBy('f.vencimento','desc'))
}

export const buscarPorId = async (req: Request, res: Response) => {
  const item = await db('financeiro as f').join('alunos as a','f.aluno_id','a.id')
    .select('f.*','a.nome as aluno_nome').where('f.id', req.params.id).first()
  if (!item) return res.status(404).json({ erro: 'Lançamento não encontrado' })
  return res.json(item)
}

export const criar = async (req: Request, res: Response) => {
  const { aluno_id, descricao, valor, vencimento, tipo } = req.body
  if (!aluno_id || !descricao || valor === undefined || !vencimento) return res.status(400).json({ erro: 'Campos obrigatórios: aluno_id, descricao, valor, vencimento' })
  const id = uuid()
  await db('financeiro').insert({ id, aluno_id, descricao, valor, vencimento, status: 'pendente', tipo: tipo||'mensalidade' })
  return res.status(201).json(await db('financeiro').where({ id }).first())
}

export const registrarPagamento = async (req: Request, res: Response) => {
  const item = await db('financeiro').where({ id: req.params.id }).first()
  if (!item) return res.status(404).json({ erro: 'Lançamento não encontrado' })
  const pago_em = new Date().toISOString().split('T')[0]
  await db('financeiro').where({ id: req.params.id }).update({ status: 'pago', pago_em })
  return res.json({ mensagem: 'Pagamento registrado com sucesso' })
}

export const atualizar = async (req: Request, res: Response) => {
  const item = await db('financeiro').where({ id: req.params.id }).first()
  if (!item) return res.status(404).json({ erro: 'Lançamento não encontrado' })
  const { descricao, valor, vencimento, status, tipo } = req.body
  const upd: any = {}
  if (descricao !== undefined) upd.descricao = descricao
  if (valor !== undefined) upd.valor = valor
  if (vencimento !== undefined) upd.vencimento = vencimento
  if (status !== undefined) upd.status = status
  if (tipo !== undefined) upd.tipo = tipo
  await db('financeiro').where({ id: req.params.id }).update(upd)
  return res.json(await db('financeiro').where({ id: req.params.id }).first())
}

export const deletar = async (req: Request, res: Response) => {
  const item = await db('financeiro').where({ id: req.params.id }).first()
  if (!item) return res.status(404).json({ erro: 'Lançamento não encontrado' })
  await db('financeiro').where({ id: req.params.id }).delete()
  return res.json({ mensagem: 'Lançamento removido' })
}
