import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './components/HomePage.vue'
import CadastrarCurriculo from './components/CadastrarCurriculo.vue'
import VerCurriculos from './components/VerCurriculos.vue'
import EditarCurriculo from './components/EditarCurriculo.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/cadastrar', component: CadastrarCurriculo },
  { path: '/curriculos', component: VerCurriculos },
  { path: '/editar/:id', component: EditarCurriculo},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')