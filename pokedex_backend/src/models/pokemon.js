const pokemonQueries = {
    getAll: 'SELECT * FROM pokemons WHERE is_deleted=0',
    getByID: 'SELECT * FROM pokemons WHERE id = ? AND is_deleted=0',
    getByPokemonName: 'SELECT * FROM pokemons WHERE pokemon = ? AND is_deleted=0',
    createPokemon: 'INSERT INTO pokemons (pokemon) VALUES(?)',
    updatePokemon: 'UPDATE pokemons SET pokemon =? WHERE id =?',
    deletePokemon: 'UPDATE pokemons SET is_deleted=1 WHERE id =?',
}

module.exports={
    pokemonQueries
}