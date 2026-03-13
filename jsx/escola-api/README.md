# 🎓 EduPrime API

Back-end do sistema escolar EduPrime.
**Node.js + Express + TypeScript + SQLite**

---

## 🚀 Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Criar o banco e popular com dados iniciais
npm run seed

# 3. Rodar em desenvolvimento (hot-reload)
npm run dev

# 4. Build para produção
npm run build
npm start
```

A API estará em: **http://localhost:3333**

---

## 🔑 Usuários padrão (após seed)

| Role       | E-mail                         | Senha     |
|------------|--------------------------------|-----------|
| Admin      | admin@eduprime.com             | admin123  |
| Secretaria | secretaria@eduprime.com        | sec123    |

---

## 📡 Endpoints da API

Todas as rotas (exceto login) exigem header:
```
Authorization: Bearer <token>
```

### 🔐 Autenticação
| Método | Rota              | Descrição              |
|--------|-------------------|------------------------|
| POST   | /api/auth/login   | Login, retorna o token |
| GET    | /api/auth/me      | Dados do usuário logado|
| PUT    | /api/auth/senha   | Alterar senha          |

**Body login:**
```json
{ "email": "admin@eduprime.com", "senha": "admin123" }
```

---

### 👨‍🎓 Alunos
| Método | Rota                      | Descrição              | Role mínima     |
|--------|---------------------------|------------------------|-----------------|
| GET    | /api/alunos               | Listar (com filtros)   | qualquer        |
| GET    | /api/alunos/:id           | Detalhes + notas       | qualquer        |
| POST   | /api/alunos               | Criar aluno            | admin/secretaria|
| PUT    | /api/alunos/:id           | Atualizar aluno        | admin/secretaria|
| DELETE | /api/alunos/:id           | Remover aluno          | admin           |
| GET    | /api/alunos/:id/notas     | Notas do aluno         | qualquer        |
| POST   | /api/alunos/:id/notas     | Lançar nota            | admin/professor |

**Query params (GET /api/alunos):**
- `busca` — nome, matrícula ou turma
- `status` — ativo | inativo | transferido
- `mensalidade` — em_dia | atrasada | isenta
- `turma_id` — UUID da turma

---

### 👩‍🏫 Professores
| Método | Rota                  | Descrição          | Role mínima |
|--------|-----------------------|--------------------|-------------|
| GET    | /api/professores      | Listar             | qualquer    |
| GET    | /api/professores/:id  | Detalhes           | qualquer    |
| POST   | /api/professores      | Criar              | admin       |
| PUT    | /api/professores/:id  | Atualizar          | admin       |
| DELETE | /api/professores/:id  | Remover            | admin       |

---

### 📚 Turmas
| Método | Rota            | Descrição               | Role mínima      |
|--------|-----------------|-------------------------|------------------|
| GET    | /api/turmas     | Listar com total alunos | qualquer         |
| GET    | /api/turmas/:id | Detalhes + alunos       | qualquer         |
| POST   | /api/turmas     | Criar                   | admin/secretaria |
| PUT    | /api/turmas/:id | Atualizar               | admin/secretaria |
| DELETE | /api/turmas/:id | Remover                 | admin            |

---

### 💰 Financeiro
| Método | Rota                       | Descrição          | Role mínima      |
|--------|----------------------------|--------------------|------------------|
| GET    | /api/financeiro            | Listar lançamentos | qualquer         |
| GET    | /api/financeiro/:id        | Detalhes           | qualquer         |
| POST   | /api/financeiro            | Criar lançamento   | admin/secretaria |
| PUT    | /api/financeiro/:id        | Atualizar          | admin/secretaria |
| POST   | /api/financeiro/:id/pagar  | Registrar pagamento| admin/secretaria |
| DELETE | /api/financeiro/:id        | Remover            | admin            |

**Query params (GET /api/financeiro):**
- `status` — pago | pendente | vencido
- `tipo` — mensalidade | taxa | material
- `aluno_id` — UUID do aluno
- `busca` — nome do aluno ou descrição

---

### 📢 Comunicados
| Método | Rota                         | Descrição          | Role mínima      |
|--------|------------------------------|--------------------|------------------|
| GET    | /api/comunicados             | Listar             | qualquer         |
| GET    | /api/comunicados/:id         | Detalhes           | qualquer         |
| POST   | /api/comunicados             | Criar              | admin/secretaria |
| POST   | /api/comunicados/:id/lido    | Marcar como lido   | qualquer         |
| DELETE | /api/comunicados/:id         | Remover            | admin            |

---

### 📊 Relatórios
| Método | Rota                           | Descrição                    |
|--------|--------------------------------|------------------------------|
| GET    | /api/relatorios/dashboard      | KPIs gerais do sistema       |
| GET    | /api/relatorios/matriculas     | Evolução de matrículas       |
| GET    | /api/relatorios/receita        | Receita mensal vs meta       |
| GET    | /api/relatorios/desempenho     | Média por disciplina         |
| GET    | /api/relatorios/inadimplencia  | Inadimplência por turma      |
| GET    | /api/relatorios/frequencia     | Frequência por turma         |

---

## 🗄️ Banco de dados

SQLite — o arquivo `database.sqlite` é criado automaticamente na raiz do projeto ao rodar o servidor pela primeira vez. Rode `npm run seed` para popular com dados de exemplo.

---

## 🔗 Integração com o front-end

No front-end (`escola-app`), substitua os `mockData` pelas chamadas à API:

```ts
// Exemplo: buscar alunos
const response = await fetch('http://localhost:3333/api/alunos', {
  headers: { Authorization: `Bearer ${token}` }
})
const alunos = await response.json()
```

---

## 📁 Estrutura do projeto

```
escola-api/
├── src/
│   ├── server.ts              # Entry point
│   ├── types/index.ts         # Tipos TypeScript
│   ├── database/
│   │   ├── db.ts              # Conexão + migrations
│   │   └── seed.ts            # Dados iniciais
│   ├── middlewares/
│   │   └── auth.ts            # JWT autenticar/autorizar
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── alunosController.ts
│   │   ├── professoresController.ts
│   │   ├── turmasController.ts
│   │   ├── financeiroController.ts
│   │   ├── comunicadosController.ts
│   │   └── relatoriosController.ts
│   └── routes/
│       └── index.ts           # Todas as rotas
├── .env                       # Variáveis de ambiente
├── package.json
└── tsconfig.json
```
