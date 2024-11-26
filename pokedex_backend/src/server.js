const express = require('express');
const { pokemonRouter } = require('./routes/pokemon');
const { movementRouter } = require('./routes/movements'); // Asegúrate de usar el nombre correcto del router
const { pokemonsMovementsRouter } = require('./routes/pokemons_movements'); // Importar el nuevo router

// Crear clase
class Server {
    constructor() { // Características básicas de la clase
        this.app = express();
        this.port = 3000;
        this.seeders();
        this.middlewares();
        this.routes();
    }
     
    middlewares() {
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/pokemon', pokemonRouter); // Rutas para Pokémon
        this.app.use('/movements', movementRouter); // Rutas para Movements
        this.app.use('/pokemons_movements', pokemonsMovementsRouter); // Rutas para Pokémons-Movements
    }

    seeders() {
        require('./seeds/pokemon').pokemonsSeeder(); // Ejecutar seeders de Pokémon
        // Puedes agregar un seeder para movimientos si lo necesitas
    }

    start() {
        this.app.listen(this.port, () => {
            console.log('Server is running on port ' + this.port);
        });
    }
}

module.exports = {
    Server
};
