import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { migrate } from './database/db';
import routes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

// Configura CORS para frontends em dev
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

// Parse JSON e form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging para desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  app.use((req, _res, next) => {
    console.log(`[${new Date().toLocaleTimeString('pt-BR')}] ${req.method} ${req.path}`);
    next();
  });
}

// Rotas principais
app.use('/api', routes);

// Rota de health check
app.get('/health', (_req, res) => res.json({ status: 'ok', versao: '1.0.0' }));

// Tratamento de 404 para rotas não encontradas
app.use((_req, res) => res.status(404).json({ erro: 'Rota não encontrada' }));

// Tratamento de erro interno
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

// Conectar e iniciar servidor
migrate().then(() => {
  app.listen(PORT, () => {
    console.log('\n🚀 EduPrime API rodando!');
    console.log('─────────────────────────────');
    console.log(`📡  http://localhost:${PORT}/api`);
    console.log(`❤️   http://localhost:${PORT}/health`);
    console.log('─────────────────────────────\n');
  });
}).catch(e => {
  console.error('Erro ao iniciar:', e);
  process.exit(1);
});

export default app;