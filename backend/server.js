require('dotenv').config(); // Adicione esta linha no início do seu arquivo server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const { sequelize } = require('./models'); // ou outro caminho para o arquivo de modelos

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

async function initializeDatabase() {
  try {
    await sequelize.sync({ alter: true }); // Ajusta tabelas sem perder dados
    console.log('Banco de dados sincronizado!');
  } catch (error) {
    console.error('Erro na sincronização do banco de dados:', error);
    process.exit(1); // Finaliza o processo em caso de erro
  }
}

initializeDatabase().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
});
