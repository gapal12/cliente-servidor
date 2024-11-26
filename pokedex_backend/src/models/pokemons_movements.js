const pokemonsMovementsQueries = {
    getAll: 'SELECT * FROM pokemons_movements',
    getByID: 'SELECT * FROM pokemons_movements WHERE id = ?',
    create: 'INSERT INTO pokemons_movements (pokemon_id, movement_id) VALUES (?, ?)',
    delete: 'DELETE FROM pokemons_movements WHERE id = ?',
};

module.exports = {
    pokemonsMovementsQueries,
};
