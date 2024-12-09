const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const secret = process.env.JWT_SECRET; // Certifique-se de que esta variável está definida

if (!secret) {
  throw new Error('JWT_SECRET não está definido nas variáveis de ambiente.');
}

// Configuração do rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP
  message: 'Muitas requisições vindas deste IP, tente novamente mais tarde.',
});

// Aplicar o rate limiter às rotas de autenticação
router.use(limiter);

// Função para validar entrada de dados
const validateInput = (fields) => {
  return fields.every(field => field && field.trim() !== '');
};

// Registro de usuário
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!validateInput([username, email, password])) {
    return res.status(400).json({ error: 'Preencha todos os campos!' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já está em uso.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12); // Aumentar o custo do hash para maior segurança
    await User.create({ name: username, email, password: hashedPassword });
    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário.' });
  }
});

// Login de usuário
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!validateInput([email, password])) {
    return res.status(400).json({ error: 'Preencha todos os campos!' });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenciais inválidas!' });
    }

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' }); // Usa o JWT_SECRET
    res.json({ token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
});

module.exports = router;
