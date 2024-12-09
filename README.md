# Modelo de Autenticação com JWT (Simples e Funcional)
by David

## Ferramentas e Plugins Utilizados

### Frontend
- **Vue 3**: Framework progressivo para construção de interfaces de usuário.
- **Vue Router**: Gerenciamento de rotas para Vue.js.
- **Vite**: Ferramenta de build rápida e moderna.
- **Pinia**: Gerenciamento de estado para Vue.
- **Axios**: Cliente HTTP para realizar requisições.
- **Tailwind CSS**: Framework de CSS para estilização.
- **Vitest**: Framework de testes unitários.
- **PostCSS**: Ferramenta para transformar CSS com plugins.

### Backend
- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express**: Framework web para Node.js.
- **Body-Parser**: Middleware para parsear o corpo das requisições.
- **CORS**: Middleware para habilitar o compartilhamento de recursos entre origens.
- **Dotenv**: Carregamento de variáveis de ambiente a partir de um arquivo `.env`.
- **Express-Rate-Limit**: Middleware para limitar o número de requisições.
- **JsonWebToken**: Implementação de autenticação via JWT.
- **pg**: Cliente PostgreSQL para Node.js.
- **Sequelize**: ORM para Node.js, suporta migrações e modelagem de dados.

## Como Instalar o Projeto

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)
- Docker (para rodar o banco de dados)

*O postgres será instalado automaticamente pelo docker.*
*Tenha o Docker Desktop instalado.*

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/dvaidsousa/Auth-Login-Register-Vue-Node.git
   ```
   (Renomeie o arquivo `.env.example` para `.env` e configure as informações do seu banco de dados)

2. **Instale as dependências no backend:**
   ```bash
   cd backend
   npm install
   ```

3. **Suba o container do banco de dados:**
   ```bash
   docker-compose up -d
   ```

4. **Crie o banco de dados com o mesmo nome no `.env`.**

5. **Rode as migrations:**
   ```bash
   npx sequelize-cli db:migrate
   ```

6. **Rode o servidor:**
   ```bash
   npm start
   ```

7. **Instale as dependências no frontend:**
   ```bash
   cd frontend
   npm install
   ```

8. **Rode o frontend:**
   ```bash
   npm run dev
   ```

## Pronto, seu autenticador com login e cadastro está funcionando!

### Estrutura do Banco de Dados
As tabelas no banco de dados são:
- ID
- NAME
- EMAIL
- PASSWORD
- CREATED_AT
- UPDATED_AT

Na página de registro, há uma confirmação de senha onde é necessário digitar a senha duas vezes iguais para cadastrar.
