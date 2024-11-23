<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Início</router-link> |
        <router-link to="/cadastrar">Cadastrar Currículo</router-link> |
        <router-link to="/curriculos">Ver Currículos</router-link>
      </nav>
    </header>

    <router-view></router-view>

    <footer>
      <p>&copy; 2023 Sistema de Cadastro de Currículos. Todos os direitos reservados.</p>
      <p>Contato: contato@curriculos.com</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
}

nav a.router-link-exact-active {
  color: #42b983;
}

footer {
  margin-top: 40px;
  padding: 20px;
  background-color: #f8f8f8;
  font-size: 0.9em;
}
</style>