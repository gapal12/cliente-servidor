const { response, request } = require('express');
const pool = require('../db/connection');
const { pokemonsMovementsQueries } = require('../models/pokemons_movements');

const getAll = async (req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const pokemonsMovements = await conn.query(pokemonsMovementsQueries.getAll);
        res.send(pokemonsMovements);
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

const getByID = async (req = request, res = response) => {
    const { id } = req.params;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const pokemonMovement = await conn.query(pokemonsMovementsQueries.getByID, [id]);

        if (pokemonMovement.length === 0) {
            res.status(404).send('Pokemon-Movement not found');
            return;
        }

        res.send(pokemonMovement);
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

const addPokemonMovement = async (req = request, res = response) => {
    const { pokemon_id, movement_id } = req.body;

    if (!pokemon_id || !movement_id) {
        res.status(400).send('pokemon_id and movement_id fields are required');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const newPokemonMovement = await conn.query(pokemonsMovementsQueries.create, [pokemon_id, movement_id]);

        if (newPokemonMovement.affectedRows === 0) {
            res.status(500).send('Failed to associate pokemon with movement');
            return;
        }

        res.status(201).send('Pokemon-Movement added successfully');
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

const deletePokemonMovement = async (req = request, res = response) => {
    const { id } = req.params;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const deleteResult = await conn.query(pokemonsMovementsQueries.delete, [id]);

        if (deleteResult.affectedRows === 0) {
            res.status(404).send('Pokemon-Movement not found');
            return;
        }

        res.status(200).send('Pokemon-Movement deleted successfully');
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

module.exports = {
    getAll,
    getByID,
    addPokemonMovement,
    deletePokemonMovement,
};
