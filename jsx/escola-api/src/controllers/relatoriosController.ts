import { Request, Response } from 'express'
import db from '../database/db'

export const dashboard = async (_req: Request, res: Response) => {
  const r1 = await db('alunos').where({ status: 'ativo' }).count('id as count').first() as any
  const r2 = await db('professores').where({ status: 'ativo' }).count('id as count').first() as any
  const r3 = await db('turmas').count('id as count').first() as any
  const hoje = new Date()
  const mes = `${hoje.getFullYear()}-${String(hoje.getMonth()+1).padStart(2,'0')}`
  const r4 = await db('financeiro').where({ status: 'pago' }).whereRaw(`strftime('%Y-%m', pago_em) = ?`, [mes]).sum('valor as total').first() as any
  const r5 = await db('alunos').where({ mensalidade: 'atrasada', status: 'ativo' }).count('id as count').first() as any
  const totalAlunos = Number(r1.count)
  const inadimplentes = Number(r5.count)
  const r6 = await db('frequencias').whereRaw(`date(data) >= date('now', '-30 days')`).select(db.raw('COUNT(*) as total'), db.raw('SUM(presente) as presentes')).first() as any
  const r7 = await db('alunos').whereRaw(`criado_em >= ?`, [`${mes}-01`]).count('id as count').first() as any
  return res.json({
    totalAlunos,
    totalProfessores: Number(r2.count),
    totalTurmas: Number(r3.count),
    receitaMes: Number(r4?.total || 0),
    inadimplencia: totalAlunos > 0 ? parseFloat(((inadimplentes / totalAlunos)*100).toFixed(1)) : 0,
    presencaMedia: r6?.total > 0 ? parseFloat(((r6.presentes / r6.total)*100).toFixed(1)) : 0,
    novosMes: Number(r7.count),
  })
}

export const evolucaoMatriculas = async (_req: Request, res: Response) => {
  const dados = await db('alunos').whereRaw(`criado_em >= date('now', '-7 months')`)
    .select(db.raw(`strftime('%Y-%m', criado_em) as mes`)).count('id as alunos')
    .groupByRaw(`strftime('%Y-%m', criado_em)`).orderBy('mes')
  return res.json(dados)
}

export const receitaMensal = async (_req: Request, res: Response) => {
  const dados = await db('financeiro').whereRaw(`vencimento >= date('now', '-7 months')`)
    .select(db.raw(`strftime('%Y-%m', vencimento) as mes`),
            db.raw(`SUM(CASE WHEN status='pago' THEN valor ELSE 0 END) as receita`),
            db.raw(`SUM(valor) as meta`))
    .groupByRaw(`strftime('%Y-%m', vencimento)`).orderBy('mes')
  return res.json(dados)
}

export const desempenhoPorDisciplina = async (_req: Request, res: Response) => {
  const dados = await db('notas as n').join('disciplinas as d','n.disciplina_id','d.id')
    .where('n.bimestre', 1).select('d.nome as disciplina')
    .avg('n.valor as media').count('n.id as total_notas')
    .groupBy('d.id','d.nome').orderBy('media','desc')
  return res.json(dados.map((d: any) => ({ ...d, media: parseFloat(Number(d.media).toFixed(1)) })))
}

export const inadimplenciaPorTurma = async (_req: Request, res: Response) => {
  const dados = await db.raw(`
    SELECT t.nome as turma,
      COUNT(a.id) as total,
      SUM(CASE WHEN a.mensalidade = 'atrasada' THEN 1 ELSE 0 END) as inadimplentes
    FROM turmas t
    LEFT JOIN alunos a ON a.turma_id = t.id AND a.status = 'ativo'
    GROUP BY t.id, t.nome ORDER BY inadimplentes DESC
  `)
  return res.json(dados)
}

export const frequenciaPorTurma = async (_req: Request, res: Response) => {
  const dados = await db.raw(`
    SELECT t.nome as turma,
      COUNT(f.id) as total_registros,
      ROUND(COALESCE(AVG(f.presente),0) * 100, 1) as percentual
    FROM turmas t
    LEFT JOIN frequencias f ON f.turma_id = t.id AND date(f.data) >= date('now', '-30 days')
    GROUP BY t.id, t.nome ORDER BY percentual DESC
  `)
  return res.json(dados)
}
