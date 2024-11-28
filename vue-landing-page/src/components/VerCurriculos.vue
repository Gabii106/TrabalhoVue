<template>
  <div class="ver-curriculos">
    <h2>Currículos Cadastrados</h2>
    <div v-if="curriculos.length === 0">
      Nenhum currículo cadastrado ainda.
    </div>
    <div v-else class="curriculos-list">
      <div v-for="curriculo in curriculos" :key="curriculo._id" class="curriculo-item">
        <h3>{{ curriculo.nome }}</h3>
        <p><strong>E-mail:</strong> {{ curriculo.email }}</p>
        <p><strong>Telefone:</strong> {{ curriculo.telefone }}</p>

        <h4>Formações Acadêmicas:</h4>
        <ul>
          <li v-for="(formacao, index) in curriculo.formacoes" :key="index">
            {{ formacao.curso }} - {{ formacao.instituicao }} ({{ formacao.anoConclusao }})
          </li>
        </ul>

        <h4>Experiências Profissionais:</h4>
        <ul>
          <li v-for="(experiencia, index) in curriculo.experiencias" :key="index">
            {{ experiencia.cargo }} em {{ experiencia.empresa }} ({{ experiencia.periodo }})
          </li>
        </ul>

        <button @click="verDetalhes(curriculo)">Ver Detalhes</button>
      </div>
    </div>

    <div v-if="curriculoSelecionado" class="modal">
      <div class="modal-content">
        <span class="close" @click="fecharModal">&times;</span>
        <h2>{{ curriculoSelecionado.nome }}</h2>
        <p><strong>E-mail:</strong> {{ curriculoSelecionado.email }}</p>
        <p><strong>Telefone:</strong> {{ curriculoSelecionado.telefone }}</p>
        <p><strong>Endereço:</strong> {{ curriculoSelecionado.endereco }}</p>

        <h3>Formações Acadêmicas</h3>
        <ul>
          <li v-for="(formacao, index) in curriculoSelecionado.formacoes" :key="index">
            {{ formacao.curso }} - {{ formacao.instituicao }} ({{ formacao.anoConclusao }})
          </li>
        </ul>

        <h3>Experiências Profissionais</h3>
        <ul>
          <li v-for="(experiencia, index) in curriculoSelecionado.experiencias" :key="index">
            {{ experiencia.cargo }} em {{ experiencia.empresa }} ({{ experiencia.periodo }})
          </li>
        </ul>

        <h3>Habilidades</h3>
        <ul>
          <li v-for="(habilidade, index) in curriculoSelecionado.habilidades" :key="index">{{ habilidade }}</li>
        </ul>

        <h3>Idiomas</h3>
        <ul>
          <li v-for="(idioma, index) in curriculoSelecionado.idiomas" :key="index">{{ idioma }}</li>
        </ul>

        <h3>Objetivo Profissional</h3>
        <p>{{ curriculoSelecionado.objetivo }}</p>

        <button @click="editarCurriculo">Editar</button>
        <button @click="excluirCurriculo">Excluir</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'VerCurriculos',
  data() {
    return {
      curriculos: [],
      curriculoSelecionado: null,
      loading: true,
    };
  },
  methods: {
    async fetchCurriculos() {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}/curriculos`);
        this.curriculos = response.data; // Certifique-se de que o backend retorna um array de currículos
        this.loading = false;
      } catch (error) {
        console.error('Erro ao buscar currículos:', error);
        this.loading = false;
      }
    },
    verDetalhes(curriculo) {
      this.curriculoSelecionado = curriculo;
    },
    fecharModal() {
      this.curriculoSelecionado = null;
    },
    async excluirCurriculo() {
      if (!this.curriculoSelecionado) return;
      const confirmacao = confirm('Tem certeza de que deseja excluir este currículo?');
      if (!confirmacao) return;

      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        await axios.delete(`${apiUrl}/curriculos/${this.curriculoSelecionado._id}`);
        this.curriculos = this.curriculos.filter(c => c._id !== this.curriculoSelecionado._id);
        this.fecharModal();
        alert('Currículo excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir currículo:', error);
        alert('Houve um erro ao excluir o currículo. Tente novamente.');
      }
    },
  },
  async mounted() {
    await this.fetchCurriculos();
  },
};
</script>

<style scoped>
.ver-curriculos {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.curriculos-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.curriculo-item {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
}

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

button {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 3px;
}

button:hover {
  background-color: #3aa876;
}
</style>