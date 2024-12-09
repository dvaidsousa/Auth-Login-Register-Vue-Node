  // Start of Selection
<template>
    <div>
      <h2>Registrar</h2>
      <form @submit.prevent="register">
        <input v-model="username" placeholder="Usuário" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Senha" required />
        <input v-model="confirmPassword" type="password" placeholder="Confirme a Senha" required />
        <button type="submit">Registrar</button>
        <p v-if="passwordMismatch" style="color: red;">As senhas não coincidem.</p>
        <p v-if="registrationSuccess" style="color: green;">Usuário registrado com sucesso!</p>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        passwordMismatch: false,
        registrationSuccess: false,
      };
    },
    methods: {
      async register() {
        if (this.password !== this.confirmPassword) {
          this.passwordMismatch = true;
          return;
        }

        this.passwordMismatch = false;

        try {
          const response = await axios.post('http://localhost:3000/api/auth/register', {
            username: this.username,
            email: this.email,
            password: this.password,
          });
          if (response.status === 201) {
            this.registrationSuccess = true;
            setTimeout(() => {
              this.$router.push('/');
            }, 2000);
          }
        } catch (error) {
          console.error('Erro ao registrar usuário.');
        }
      },
    },
  };
  </script>