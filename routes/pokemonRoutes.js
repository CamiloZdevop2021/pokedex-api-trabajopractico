const express = require('express');
const {
    createPokemon,
    getAllPokemons,
    getPokemonById,
    getMyPokemons,
    updatePokemon,
    deletePokemon,
} = require('../controllers/pokemonController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createPokemon);
router.get('/', getAllPokemons);
router.get('/:id', getPokemonById);
router.get('/trainer/mypokemons', authMiddleware, getMyPokemons);
router.put('/:id', authMiddleware, updatePokemon);
router.delete('/:id', authMiddleware, deletePokemon);

module.exports = router;
