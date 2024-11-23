<template>
  <div class="home">
    <h1>Bem-vindo ao Sistema de Cadastro de Currículos</h1>
    <p>Aqui você pode cadastrar seu currículo e visualizar currículos cadastrados.</p>
    <div class="cta-buttons">
      <router-link to="/cadastrar" class="btn btn-primary">Cadastrar Currículo</router-link>
      <router-link to="/curriculos" class="btn btn-secondary">Ver Currículos</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

p {
  font-size: 1.2em;
  margin-bottom: 30px;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn {
  padding: 10px 20px;
  font-size: 1.1em;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #42b983;
  color: white;
}

.btn-secondary {
  background-color: #2c3e50;
  color: white;
}

.btn:hover {
  opacity: 0.8;
}
</style>