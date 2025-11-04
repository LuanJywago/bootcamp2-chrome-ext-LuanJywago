import express from 'express';
import cors from 'cors'; // Para permitir acesso do PWA

const app = express();
const port = 3000; // A porta que o Docker vai usar

// Habilita o CORS para todas as origens (facilita o desenvolvimento)
app.use(cors());

// Nosso endpoint de teste
app.get('/api/hello', (req, res) => {
  res.json({ ok: true, msg: 'Hello do Backend! A API está funcionando!' });
});

app.listen(port, () => {
  console.log(`API ouvindo na porta ${port}`);
});