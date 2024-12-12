const {Router} = require('express')
const {getAll, getByID, addPokemon, updatePokemon, deletePokemon, get3randomPokemons}= require('../controllers/pokemon')

const pokemonRouter=Router()

pokemonRouter.get('/', getAll)
pokemonRouter.get('/play',get3randomPokemons)
pokemonRouter.get('/:id', getByID)
pokemonRouter.post('/',addPokemon)
pokemonRouter.put('/:id',updatePokemon)
pokemonRouter.delete('/:id',deletePokemon)

module.exports={
    pokemonRouter
}
