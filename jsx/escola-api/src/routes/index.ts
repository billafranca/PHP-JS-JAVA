import { Router } from 'express'
import { autenticar, autorizar } from '../middlewares/auth'
import * as auth from '../controllers/authController'
import * as alunos from '../controllers/alunosController'
import * as professores from '../controllers/professoresController'
import * as turmas from '../controllers/turmasController'
import * as financeiro from '../controllers/financeiroController'
import * as comunicados from '../controllers/comunicadosController'
import * as relatorios from '../controllers/relatoriosController'

const router = Router()

// ── Auth ──────────────────────────────────────────────────────────────────────
router.post('/auth/login', auth.login)
router.get('/auth/me', autenticar, auth.me)
router.put('/auth/senha', autenticar, auth.alterarSenha)

// ── Alunos ────────────────────────────────────────────────────────────────────
router.get('/alunos', autenticar, alunos.listar)
router.get('/alunos/:id', autenticar, alunos.buscarPorId)
router.post('/alunos', autenticar, autorizar('admin', 'secretaria'), alunos.criar)
router.put('/alunos/:id', autenticar, autorizar('admin', 'secretaria'), alunos.atualizar)
router.delete('/alunos/:id', autenticar, autorizar('admin'), alunos.deletar)
router.get('/alunos/:id/notas', autenticar, alunos.notasAluno)
router.post('/alunos/:id/notas', autenticar, autorizar('admin', 'professor'), alunos.lancarNota)

// ── Professores ───────────────────────────────────────────────────────────────
router.get('/professores', autenticar, professores.listar)
router.get('/professores/:id', autenticar, professores.buscarPorId)
router.post('/professores', autenticar, autorizar('admin'), professores.criar)
router.put('/professores/:id', autenticar, autorizar('admin'), professores.atualizar)
router.delete('/professores/:id', autenticar, autorizar('admin'), professores.deletar)

// ── Turmas ────────────────────────────────────────────────────────────────────
router.get('/turmas', autenticar, turmas.listar)
router.get('/turmas/:id', autenticar, turmas.buscarPorId)
router.post('/turmas', autenticar, autorizar('admin', 'secretaria'), turmas.criar)
router.put('/turmas/:id', autenticar, autorizar('admin', 'secretaria'), turmas.atualizar)
router.delete('/turmas/:id', autenticar, autorizar('admin'), turmas.deletar)

// ── Financeiro ────────────────────────────────────────────────────────────────
router.get('/financeiro', autenticar, financeiro.listar)
router.get('/financeiro/:id', autenticar, financeiro.buscarPorId)
router.post('/financeiro', autenticar, autorizar('admin', 'secretaria'), financeiro.criar)
router.put('/financeiro/:id', autenticar, autorizar('admin', 'secretaria'), financeiro.atualizar)
router.post('/financeiro/:id/pagar', autenticar, autorizar('admin', 'secretaria'), financeiro.registrarPagamento)
router.delete('/financeiro/:id', autenticar, autorizar('admin'), financeiro.deletar)

// ── Comunicados ───────────────────────────────────────────────────────────────
router.get('/comunicados', autenticar, comunicados.listar)
router.get('/comunicados/:id', autenticar, comunicados.buscarPorId)
router.post('/comunicados', autenticar, autorizar('admin', 'secretaria'), comunicados.criar)
router.post('/comunicados/:id/lido', autenticar, comunicados.marcarLido)
router.delete('/comunicados/:id', autenticar, autorizar('admin'), comunicados.deletar)

// ── Relatórios ────────────────────────────────────────────────────────────────
router.get('/relatorios/dashboard', autenticar, relatorios.dashboard)
router.get('/relatorios/matriculas', autenticar, relatorios.evolucaoMatriculas)
router.get('/relatorios/receita', autenticar, relatorios.receitaMensal)
router.get('/relatorios/desempenho', autenticar, relatorios.desempenhoPorDisciplina)
router.get('/relatorios/inadimplencia', autenticar, relatorios.inadimplenciaPorTurma)
router.get('/relatorios/frequencia', autenticar, relatorios.frequenciaPorTurma)

export default router
