const mariadb = require('mariadb')

const config={
    host: '127.0.0.1',
    user: 'mariadb_user',
    password: 'abc123',
    database: 'pokemondb',
    port: 3307,
    connectionLimit: 10,
    
}

const pool = mariadb.createPool(config)    //pool es una concexion de espacio para conexiones a la base de dato

module.exports = pool