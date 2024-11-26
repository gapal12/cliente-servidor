const { Router } = require('express');
const { getAll, getByID, addPokemonMovement, deletePokemonMovement } = require('../controllers/pokemons_movements');

const pokemonsMovementsRouter = Router();

pokemonsMovementsRouter.get('/', getAll);
pokemonsMovementsRouter.get('/:id', getByID);
pokemonsMovementsRouter.post('/', addPokemonMovement);
pokemonsMovementsRouter.delete('/:id', deletePokemonMovement);

module.exports = {
    pokemonsMovementsRouter,
};
