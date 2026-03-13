import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import db from '../database/db'

export const listar = async (req: Request, res: Response) => {
  const comunicados = await db('comunicados as c').join('usuarios as u','c.autor_id','u.id')
    .leftJoin('comunicados_lidos as cl', function() { this.on('cl.comunicado_id','c.id').andOn('cl.usuario_id', db.raw('?', [req.usuario!.id])) })
    .select('c.*','u.nome as autor_nome', db.raw('CASE WHEN cl.usuario_id IS NOT NULL THEN 1 ELSE 0 END as lido'))
    .orderBy('c.criado_em','desc')
  return res.json(comunicados)
}

export const buscarPorId = async (req: Request, res: Response) => {
  const c = await db('comunicados as c').join('usuarios as u','c.autor_id','u.id')
    .select('c.*','u.nome as autor_nome').where('c.id', req.params.id).first()
  if (!c) return res.status(404).json({ erro: 'Comunicado não encontrado' })
  return res.json(c)
}

export const criar = async (req: Request, res: Response) => {
  const { titulo, conteudo, destinatarios, prioridade } = req.body
  if (!titulo || !conteudo) return res.status(400).json({ erro: 'Título e conteúdo são obrigatórios' })
  const id = uuid()
  await db('comunicados').insert({ id, titulo, conteudo, autor_id: req.usuario!.id, destinatarios: destinatarios||'todos', prioridade: prioridade||'normal' })
  return res.status(201).json(await db('comunicados').where({ id }).first())
}

export const marcarLido = async (req: Request, res: Response) => {
  await db('comunicados_lidos').insert({ usuario_id: req.usuario!.id, comunicado_id: req.params.id }).onConflict(['usuario_id','comunicado_id']).ignore()
  return res.json({ mensagem: 'Marcado como lido' })
}

export const deletar = async (req: Request, res: Response) => {
  const c = await db('comunicados').where({ id: req.params.id }).first()
  if (!c) return res.status(404).json({ erro: 'Comunicado não encontrado' })
  await db('comunicados').where({ id: req.params.id }).delete()
  return res.json({ mensagem: 'Comunicado removido' })
}
