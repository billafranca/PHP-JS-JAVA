import knex from 'knex'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const dbPath = process.env.DB_PATH || './database.sqlite'

const db = knex({
  client: 'sqlite3', 
  connection: { filename: path.resolve(dbPath) },
  useNullAsDefault: true,
})

export async function migrate() {

  await db.raw('PRAGMA foreign_keys = ON')
  await db.raw('PRAGMA journal_mode = WAL')

  if (!(await db.schema.hasTable('usuarios'))) {
    await db.schema.createTable('usuarios', t => {
      t.string('id').primary()
      t.string('nome').notNullable()
      t.string('email').notNullable().unique()
      t.string('senha').notNullable()
      t.string('role').notNullable().defaultTo('secretaria')
      t.integer('ativo').notNullable().defaultTo(1)
      t.timestamp('criado_em').defaultTo(db.fn.now())
    })
  }

  if (!(await db.schema.hasTable('professores'))) {
    await db.schema.createTable('professores', t => {
      t.string('id').primary()
      t.string('nome').notNullable()
      t.string('email').notNullable().unique()
      t.string('telefone')
      t.string('status').notNullable().defaultTo('ativo')
      t.integer('carga_horaria').notNullable().defaultTo(40)
      t.timestamp('criado_em').defaultTo(db.fn.now())
    })
  }

  if (!(await db.schema.hasTable('turmas'))) {
    await db.schema.createTable('turmas', t => {
      t.string('id').primary()
      t.string('nome').notNullable()
      t.string('serie').notNullable()
      t.string('turno').notNullable().defaultTo('manhã')
      t.integer('capacidade').notNullable().defaultTo(35)
      t.string('sala').notNullable()
      t.string('professor_id').references('id').inTable('professores')
      t.timestamp('criado_em').defaultTo(db.fn.now())
    })
  }

  if (!(await db.schema.hasTable('alunos'))) {
    await db.schema.createTable('alunos', t => {
      t.string('id').primary()
      t.string('nome').notNullable()
      t.string('matricula').notNullable().unique()
      t.string('turma_id').references('id').inTable('turmas')
      t.string('email')
      t.string('telefone')
      t.string('responsavel')
      t.string('data_nascimento')
      t.string('status').notNullable().defaultTo('ativo')
      t.string('mensalidade').notNullable().defaultTo('em_dia')
      t.string('foto')
      t.timestamp('criado_em').defaultTo(db.fn.now())
    })
  }

  if (!(await db.schema.hasTable('disciplinas'))) {
    await db.schema.createTable('disciplinas', t => {
      t.string('id').primary()
      t.string('nome').notNullable()
      t.string('professor_id').references('id').inTable('professores')
    })
  }

  if (!(await db.schema.hasTable('notas'))) {
    await db.schema.createTable('notas', t => {
      t.string('id').primary()
      t.string('aluno_id').notNullable().references('id').inTable('alunos').onDelete('CASCADE')
      t.string('disciplina_id').notNullable().references('id').inTable('disciplinas')
      t.integer('bimestre').notNullable()
      t.float('valor').notNullable()
      t.timestamp('criado_em').defaultTo(db.fn.now())

      t.unique(['aluno_id', 'disciplina_id', 'bimestre'])
    })
  }

  if (!(await db.schema.hasTable('frequencias'))) {
    await db.schema.createTable('frequencias', t => {
      t.string('id').primary()
      t.string('aluno_id').notNullable().references('id').inTable('alunos').onDelete('CASCADE')
      t.string('turma_id').notNullable().references('id').inTable('turmas')
      t.string('data').notNullable()
      t.integer('presente').notNullable().defaultTo(1)

      t.unique(['aluno_id', 'data'])
    })
  }

  if (!(await db.schema.hasTable('financeiro'))) {
    await db.schema.createTable('financeiro', t => {
      t.string('id').primary()
      t.string('aluno_id').notNullable().references('id').inTable('alunos').onDelete('CASCADE')
      t.string('descricao').notNullable()
      t.float('valor').notNullable()
      t.string('vencimento').notNullable()
      t.string('status').notNullable().defaultTo('pendente')
      t.string('tipo').notNullable().defaultTo('mensalidade')
      t.string('pago_em')
      t.timestamp('criado_em').defaultTo(db.fn.now())
    })
  }

  if (!(await db.schema.hasTable('comunicados'))) {
    await db.schema.createTable('comunicados', t => {
      t.string('id').primary()
      t.string('titulo').notNullable()
      t.text('conteudo').notNullable()
      t.string('autor_id').notNullable().references('id').inTable('usuarios')
      t.string('destinatarios').notNullable().defaultTo('todos')
      t.string('prioridade').notNullable().defaultTo('normal')
      t.timestamp('criado_em').defaultTo(db.fn.now())
    })
  }

  if (!(await db.schema.hasTable('comunicados_lidos'))) {
    await db.schema.createTable('comunicados_lidos', t => {
      t.string('usuario_id').notNullable()
      t.string('comunicado_id').notNullable()
      t.timestamp('lido_em').defaultTo(db.fn.now())

      t.primary(['usuario_id', 'comunicado_id'])
    })
  }

  console.log('✅ Migrations executadas com sucesso')
}

export default db