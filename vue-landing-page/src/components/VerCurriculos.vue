<template>
  <div class="ver-curriculos">
    <h2>Currículos Cadastrados</h2>
    <div v-if="curriculos.length === 0">Nenhum currículo cadastrado ainda.</div>
    <div v-else class="curriculos-list">
      <div v-for="curriculo in curriculos" :key="curriculo.id" class="curriculo-item">
        <h3>{{ curriculo.nome }}</h3>
        <p><strong>E-mail:</strong> {{ curriculo.email }}</p>
        <p><strong>Telefone:</strong> {{ curriculo.telefone }}</p>
        <p>
          <strong>Formação:</strong> {{ curriculo.formacao.curso }} -
          {{ curriculo.formacao.instituicao }}
        </p>
        <p>
          <strong>Experiência:</strong> {{ curriculo.experiencia.cargo }} em
          {{ curriculo.experiencia.empresa }}
        </p>
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
        <h3>Formação Acadêmica</h3>
        <p>
          {{ curriculoSelecionado.formacao.curso }} -
          {{ curriculoSelecionado.formacao.instituicao }} ({{
            curriculoSelecionado.formacao.anoConclusao
          }})
        </p>
        <h3>Experiência Profissional</h3>
        <p>
          {{ curriculoSelecionado.experiencia.cargo }} em
          {{ curriculoSelecionado.experiencia.empresa }} ({{
            curriculoSelecionado.experiencia.periodo
          }})
        </p>
        <h3>Habilidades</h3>
        <ul>
          <li
            v-for="(habilidade, index) in curriculoSelecionado.habilidades"
            :key="index"
          >
            {{ habilidade }}
          </li>
        </ul>
        <p><strong>Idiomas:</strong> {{ curriculoSelecionado.idiomas }}</p>
        <h3>Objetivo Profissional</h3>
        <p>{{ curriculoSelecionado.objetivo }}</p>
        <button @click="editarCurriculo">Editar</button>
        <button @click="excluirCurriculo">Excluir</button>
      </div>
    </div>
  </div>
</template>

<script>
const apiUrl = import.meta.env.VITE_API_URL;

export default {
  name: "VerCurriculos",
  data() {
    return {
      curriculos: [],
      curriculoSelecionado: null,
    };
  },
  methods: {
    verDetalhes(curriculo) {
      this.curriculoSelecionado = curriculo;
    },
    fecharModal() {
      this.curriculoSelecionado = null;
    },
    editarCurriculo() {
      console.log("Editar currículo:", this.curriculoSelecionado);
      if (this.curriculoSelecionado) {
        // Envia os dados atualizados para o servidor
        axios
          .put(
            `${apiUrl}/curriculos/${this.curriculoSelecionado.id}`,
            this.curriculoSelecionado
          )
          .then((response) => {
            console.log("Currículo atualizado com sucesso:", response.data);

            // Atualiza a lista local de currículos com os dados atualizados
            const index = this.curriculos.findIndex(
              (c) => c.id === this.curriculoSelecionado.id
            );
            if (index !== -1) {
              this.curriculos[index] = { ...this.curriculoSelecionado };
            }

            // Fecha o modal após a edição
            this.fecharModal();
          })
          .catch((error) => {
            console.error("Erro ao atualizar o currículo:", error);
          });
      } else {
        console.error("Nenhum currículo selecionado para edição.");
      }
    },
    excluirCurriculo() {
      // Implementar lógica de exclusão
      console.log("Excluir currículo:", this.curriculoSelecionado);
      this.curriculos = this.curriculos.filter(
        (c) => c.id !== this.curriculoSelecionado.id
      );
      this.fecharModal();
    },
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
  background-color: rgba(0, 0, 0, 0.4);
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
