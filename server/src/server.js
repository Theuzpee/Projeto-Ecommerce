// server/src/server.js

const express = require('express');
const cors = require('cors');

// 1. Importar o nosso novo arquivo de rotasconst productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rota de teste que já tínhamos
app.get('/', (req, res) => {
  res.json({ message: 'Olá! A API do seu e-commerce está no ar!' });
});

// 2. Dizer ao Express para usar as rotas de produtos
// Todas as rotas definidas em productRoutes serão prefixadas com '/api/produtos'
app.use('/api/produtos', productRoutes);
app.use('/api/usuarios', userRoutes); 

app.listen(PORT, () => {
  console.log(`🚀 Servidor back-end rodando na porta ${PORT}`);
});
