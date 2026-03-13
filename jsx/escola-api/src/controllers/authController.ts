import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'
import db from '../database/db'

export const login = async (req: Request, res: Response) => {
  const { email, senha } = req.body
  if (!email || !senha) return res.status(400).json({ erro: 'E-mail e senha são obrigatórios' })

  const usuario = await db('usuarios').where({ email, ativo: 1 }).first()
  if (!usuario) return res.status(401).json({ erro: 'Credenciais inválidas' })

  if (!bcrypt.compareSync(senha, usuario.senha)) return res.status(401).json({ erro: 'Credenciais inválidas' })

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, role: usuario.role, nome: usuario.nome },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '7d' } as any
  )
  return res.json({ token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, role: usuario.role } })
}

export const me = async (req: Request, res: Response) => {
  const usuario = await db('usuarios').select('id','nome','email','role','criado_em').where({ id: req.usuario!.id }).first()
  if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' })
  return res.json(usuario)
}

export const alterarSenha = async (req: Request, res: Response) => {
  const { senhaAtual, novaSenha } = req.body
  const usuario = await db('usuarios').where({ id: req.usuario!.id }).first()
  if (!bcrypt.compareSync(senhaAtual, usuario.senha)) return res.status(400).json({ erro: 'Senha atual incorreta' })
  await db('usuarios').where({ id: req.usuario!.id }).update({ senha: bcrypt.hashSync(novaSenha, 10) })
  return res.json({ mensagem: 'Senha alterada com sucesso' })
}
