const { response, request } = require('express');
const pool = require('../db/connection');
const { movementQueries } = require('../models/movements');

const getAll = async (req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const movements = await conn.query(movementQueries.getAll);
        res.send(movements);
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
        const movement = await conn.query(movementQueries.getByID, [id]);

        if (movement.length === 0) {
            res.status(404).send('Movement not found');
            return;
        }

        res.send(movement);
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

const addMovement = async (req = request, res = response) => {
    const { movement, description, type_id } = req.body;

    if (!movement) {
        res.status(400).send('Movement field is required');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const movementExist = await conn.query(movementQueries.getByMovementName, [movement]);

        if (movementExist.length > 0) {
            res.status(409).send('Movement already exists');
            return;
        }

        const newMovement = await conn.query(movementQueries.createMovement, [movement, description, type_id]);

        if (newMovement.affectedRows === 0) {
            res.status(500).send('Failed to create movement');
            return;
        }

        res.status(201).send('Movement added successfully');
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

const updateMovement = async (req = request, res = response) => {
    const { id } = req.params;
    const { movement, description, type_id } = req.body;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    if (!movement) {
        res.status(400).send('Movement field is required');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const movementExist = await conn.query(movementQueries.getByID, [id]);

        if (movementExist.length === 0) {
            res.status(404).send('Movement does not exist');
            return;
        }

        const updatedMovement = await conn.query(movementQueries.updateMovement, [movement, description, type_id, id]);

        if (updatedMovement.affectedRows === 0) {
            res.status(500).send('Failed to update movement');
            return;
        }

        res.status(200).send('Movement updated successfully');
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

const deleteMovement = async (req = request, res = response) => {
    const { id } = req.params;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const movementExist = await conn.query(movementQueries.getByID, [id]);

        if (movementExist.length === 0) {
            res.status(404).send('Movement does not exist');
            return;
        }

        const deletedMovement = await conn.query(movementQueries.deleteMovement, [id]);

        if (deletedMovement.affectedRows === 0) {
            res.status(500).send('Failed to delete movement');
            return;
        }

        res.status(200).send('Movement deleted successfully');
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

module.exports = {
    getAll,
    getByID,
    addMovement,
    updateMovement,
    deleteMovement,
};
