<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Senha" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return { email: '', password: '' };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem('token', response.data.token);
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Erro ao fazer login.');
      }
    },
  },
};
</script>
