const {Router} = require('express')
const {getAll, getByID, addPokemon, updatePokemon, deletePokemon}= require('../controllers/pokemon')

const pokemonRouter=Router()

pokemonRouter.get('/', getAll)
pokemonRouter.get('/:id', getByID)
pokemonRouter.post('/',addPokemon), 
pokemonRouter.put('/:id',updatePokemon),
pokemonRouter.delete('/:id',deletePokemon),

module.exports={
    pokemonRouter
}
