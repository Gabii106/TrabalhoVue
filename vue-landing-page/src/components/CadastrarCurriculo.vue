<template>
  <div class="cadastrar-curriculo">
    <h2>Cadastrar Currículo</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="nome">Nome completo:</label>
        <input type="text" id="nome" v-model="curriculo.nome" required>
      </div>

      <div class="form-group">
        <label for="email">E-mail:</label>
        <input type="email" id="email" v-model="curriculo.email" required>
      </div>

      <div class="form-group">
        <label for="telefone">Telefone:</label>
        <input type="tel" id="telefone" v-model="curriculo.telefone" required>
      </div>

      <div class="form-group">
        <label for="endereco">Endereço completo:</label>
        <input type="text" id="endereco" v-model="curriculo.endereco" required>
      </div>

      <div class="form-group">
        <label for="formacao">Formação acadêmica:</label>
        <input type="text" id="formacao" v-model="curriculo.formacao.curso" placeholder="Curso" required>
        <input type="text" v-model="curriculo.formacao.instituicao" placeholder="Instituição" required>
        <input type="number" v-model="curriculo.formacao.anoConclusao" placeholder="Ano de conclusão" required>
      </div>

      <div class="form-group">
        <label for="experiencia">Experiência profissional:</label>
        <input type="text" id="experiencia" v-model="curriculo.experiencia.empresa" placeholder="Empresa" required>
        <input type="text" v-model="curriculo.experiencia.cargo" placeholder="Cargo" required>
        <input type="text" v-model="curriculo.experiencia.periodo" placeholder="Período" required>
      </div>

      <div class="form-group">
        <label for="habilidades">Habilidades:</label>
        <div class="habilidades-input">
          <input type="text" id="habilidades" v-model="novaHabilidade" placeholder="Digite uma habilidade" />
          <button type="button" @click="adicionarHabilidade">Adicionar</button>
        </div>
        <ul>
          <li v-for="(habilidade, index) in curriculo.habilidades" :key="index">
            {{ habilidade }}
            <button type="button" @click="removerHabilidade(index)">Remover</button>
          </li>
        </ul>
      </div>

      <div class="form-group">
        <label for="idiomas">Idiomas:</label>
        <div class="idiomas-input">
          <input type="text" id="idiomas" v-model="novoIdioma" placeholder="Digite um idioma" />
          <button type="button" @click="adicionarIdioma">Adicionar</button>
        </div>
        <ul>
          <li v-for="(idioma, index) in curriculo.idiomas" :key="index">
            {{ idioma }}
            <button type="button" @click="removerIdioma(index)">Remover</button>
          </li>
        </ul>
      </div>

      <div class="form-group">
        <label for="objetivo">Objetivo profissional:</label>
        <textarea id="objetivo" v-model="curriculo.objetivo" required></textarea>
      </div>

      <button type="submit">Cadastrar Currículo</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CadastrarCurriculo',
  data() {
    return {
      curriculo: {
        nome: '',
        email: '',
        telefone: '',
        endereco: '',
        formacao: {
          curso: '',
          instituicao: '',
          anoConclusao: null
        },
        experiencia: {
          empresa: '',
          cargo: '',
          periodo: ''
        },
        habilidades: [],
        idiomas: [],
        objetivo: ''
      },
      novaHabilidade: ''
    }
  },
  methods: {
    adicionarHabilidade() {
      if (this.novaHabilidade.trim()) {
        this.curriculo.habilidades.push(this.novaHabilidade.trim());
        this.novaHabilidade = ''; // Limpar o campo de entrada após adicionar
      } else {
        alert('Digite uma habilidade válida!');
      }
    },
    removerHabilidade(index) {
      this.curriculo.habilidades.splice(index, 1);
    },
    adicionarIdioma() {
      if (this.novoIdioma.trim()) {
        this.curriculo.idiomas.push(this.novoIdioma.trim());
        this.novoIdioma = ''; // Limpar o campo de entrada após adicionar
      } else {
        alert('Formato de idioma inválido!');
      }
    },
    removerIdioma(index) {
      this.curriculo.idiomas.splice(index, 1);
    },
    async submitForm() {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;

        const response = await axios.post(`${apiUrl}/curriculos`, this.curriculo);
        console.log('Resposta da API:', response.data);

        this.curriculo = {
          nome: '',
          email: '',
          telefone: '',
          endereco: '',
          formacao: { curso: '', instituicao: '', anoConclusao: null },
          experiencia: { empresa: '', cargo: '', periodo: '' },
          habilidades: [],
          idiomas: [],
          objetivo: ''
        };
        alert('Currículo cadastrado com sucesso!');
      } catch (error) {
        console.error('Erro ao cadastrar o currículo:', error);
        alert('Houve um erro ao cadastrar o currículo. Tente novamente.');
      }
    }
  }

}
</script>

<style scoped>
.cadastrar-curriculo {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
}

.habilidades-input .idiomas-input {
  display: flex;
  gap: 10px;
}

.habilidades-input .idiomas-input input {
  flex: 1;
}

.habilidades-input .idiomas-input button {
  padding: 8px 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.habilidades-input .idiomas-input button:hover {
  background-color: #3aa876;
}
</style>