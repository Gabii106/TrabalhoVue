import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './Home.vue'
import CadastrarCurriculo from './CadastrarCurriculo.vue'
import VerCurriculos from './VerCurriculos.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/cadastrar', component: CadastrarCurriculo },
  { path: '/curriculos', component: VerCurriculos }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')