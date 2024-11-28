const express = require('express');
const Curriculum = require('../models/Curriculum');

const router = express.Router();

// GET - Listar todos os currículos
router.get('/', async (req, res) => {
  try {
    const curriculos = await Curriculum.find();
    res.status(200).json(curriculos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Criar um novo currículo
router.post('/', async (req, res) => {
  try {
    const novoCurriculo = new Curriculum(req.body);
    const savedCurriculo = await novoCurriculo.save();
    res.status(201).json(savedCurriculo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET - Obter um currículo pelo ID
router.get('/:id', async (req, res) => {
  try {
    const curriculo = await Curriculum.findById(req.params.id);
    if (!curriculo) {
      return res.status(404).json({ error: 'Currículo não encontrado' });
    }
    res.status(200).json(curriculo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - Atualizar um currículo
router.put('/:id', async (req, res) => {
  try {
    const updatedCurriculo = await Curriculum.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedCurriculo) {
      return res.status(404).json({ error: 'Currículo não encontrado' });
    }
    res.status(200).json(updatedCurriculo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - Excluir um currículo
router.delete('/:id', async (req, res) => {
  try {
    const deletedCurriculo = await Curriculum.findByIdAndDelete(req.params.id);
    if (!deletedCurriculo) {
      return res.status(404).json({ error: 'Currículo não encontrado' });
    }
    res.status(200).json({ message: 'Currículo excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
