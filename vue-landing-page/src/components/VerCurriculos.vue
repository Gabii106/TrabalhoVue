<template>
  <div class="ver-curriculos">
    <h2 class="title">Currículos Cadastrados</h2>
    
    <div v-if="loading" class="loading">
      Carregando currículos...
    </div>
    
    <div v-else>
      <div v-if="curriculos.length === 0" class="no-curriculos">
        Nenhum currículo cadastrado ainda.
      </div>
      <div v-else class="curriculos-list">
        <div v-for="curriculo in curriculos" :key="curriculo._id" class="curriculo-card">
          <header class="curriculo-header">
            <h3>{{ curriculo.nome }}</h3>
            <p>{{ curriculo.email }}</p>
          </header>
          <section class="curriculo-info">
            <p><strong>Telefone:</strong> {{ curriculo.telefone }}</p>
            <div class="formacoes">
              <strong>Formações Acadêmicas:</strong>
              <ul>
                <li v-for="(formacao, index) in curriculo.formacoes" :key="index">
                  {{ formacao.curso }} - {{ formacao.instituicao }} ({{ formacao.anoConclusao }})
                </li>
              </ul>
            </div>
            <div class="experiencias">
              <strong>Experiências Profissionais:</strong>
              <ul>
                <li v-for="(experiencia, index) in curriculo.experiencias" :key="index">
                  {{ experiencia.cargo }} em {{ experiencia.empresa }} ({{ experiencia.periodo }})
                </li>
              </ul>
            </div>
          </section>
          <footer class="curriculo-footer">
            <button @click="verDetalhes(curriculo)">Ver Detalhes</button>
          </footer>
        </div>
      </div>
    </div>

    <div v-if="curriculoSelecionado" class="modal" @click.self="fecharModal">
      <div class="modal-content">
        <span class="close" @click="fecharModal">&times;</span>
        <div class="modal-header">
          <h2>{{ curriculoSelecionado.nome }}</h2>
          <p>{{ curriculoSelecionado.email }} | {{ curriculoSelecionado.telefone }}</p>
          <p>{{ curriculoSelecionado.endereco }}</p>
        </div>
        <div class="modal-body">
          <section class="section">
            <h3>Formações Acadêmicas</h3>
            <ul>
              <li v-for="(formacao, index) in curriculoSelecionado.formacoes" :key="index">
                {{ formacao.curso }} - {{ formacao.instituicao }} ({{ formacao.anoConclusao }})
              </li>
            </ul>
          </section>
          <section class="section">
            <h3>Experiências Profissionais</h3>
            <ul>
              <li v-for="(experiencia, index) in curriculoSelecionado.experiencias" :key="index">
                {{ experiencia.cargo }} em {{ experiencia.empresa }} ({{ experiencia.periodo }})
              </li>
            </ul>
          </section>
          <section class="section">
            <h3>Habilidades</h3>
            <ul class="tags">
              <li v-for="(habilidade, index) in curriculoSelecionado.habilidades" :key="index">{{ habilidade }}</li>
            </ul>
          </section>
          <section class="section">
            <h3>Idiomas</h3>
            <ul class="tags">
              <li v-for="(idioma, index) in curriculoSelecionado.idiomas" :key="index">{{ idioma }}</li>
            </ul>
          </section>
          <section class="section">
            <h3>Objetivo Profissional</h3>
            <p>{{ curriculoSelecionado.objetivo }}</p>
          </section>
        </div>
        <div class="modal-footer">
          <button @click="editarCurriculo">Editar</button>
          <button @click="excluirCurriculo">Excluir</button>
        </div>
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
      } catch (error) {
        console.error('Erro ao buscar currículos:', error);
        alert('Houve um erro ao carregar os currículos. Tente novamente mais tarde.');
      } finally {
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
    editarCurriculo() {
      // Implementar a lógica de edição, possivelmente redirecionando para uma página de edição
      alert('Funcionalidade de edição ainda não implementada.');
    },
  },
  async mounted() {
    await this.fetchCurriculos();
  },
};
</script>


<style scoped>
.ver-curriculos {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 2rem;
}

.loading,
.no-curriculos {
  text-align: center;
  font-size: 1.2em;
  color: #666;
}

.curriculos-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.curriculo-card {
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s, box-shadow 0.3s;
}

.curriculo-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.curriculo-header h3 {
  margin: 0;
  color: #42b983;
  font-size: 1.5rem;
}

.curriculo-header p {
  margin: 5px 0 15px;
  color: #555;
  font-size: 0.9rem;
}

.curriculo-info p {
  margin: 5px 0;
  color: #444;
  font-size: 0.95rem;
}

.formacoes,
.experiencias {
  margin-top: 10px;
}

.formacoes ul,
.experiencias ul {
  padding-left: 20px;
  margin: 5px 0 0;
}

.curriculo-footer {
  text-align: center;
  margin-top: 15px;
}

button {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, transform 0.2s;
  margin: 10px;
}

button:hover {
  background-color: #369870;
  transform: scale(1.05);
}

.modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.modal-content {
  background-color: #fff;
  border-radius: 12px;
  max-width: 700px;
  width: 100%;
  padding: 30px;
  position: relative;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  margin-top: 120px;
  margin-bottom: 30px;
}

.close {
  position: absolute;
  top: 15px;
  right: 20px;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s;
}

.close:hover,
.close:focus {
  color: #000;
}

.modal-header h2 {
  margin: 0;
  color: #42b983;
  font-size: 1.8rem;
}

.modal-header p {
  margin: 5px 0;
  color: #555;
  font-size: 0.9rem;
}

.modal-body {
  margin-top: 20px;
}

.section {
  margin-bottom: 20px;
}

.section h3 {
  border-bottom: 2px solid #42b983;
  padding-bottom: 5px;
  color: #333;
  font-size: 1.2rem;
}

.section ul {
  list-style-type: disc;
  padding-left: 20px;
  margin-top: 10px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tags li {
  background-color: #f0f0f0;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.9em;
}

.modal-footer {
  text-align: center;
  margin-top: 20px;
}

.modal-footer button {
  margin: 10px;
}

@media (max-width: 600px) {
  .modal-content {
    margin-top: 210px;
    margin-left: 10px;
    margin-right: 30px;
    margin-bottom: 40px;
  }

  .curriculos-list {
    grid-template-columns: 1fr;
  }

  .title {
    font-size: 1.5rem;
  }

  .modal-header h2 {
    font-size: 1.5rem;
  }

}


</style>
