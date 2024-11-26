const movementQueries = {
    getAll: 'SELECT * FROM movements',
    getByID: 'SELECT * FROM movements WHERE id = ?',
    getByMovementName: 'SELECT * FROM movements WHERE movement = ?',
    createMovement: 'INSERT INTO movements (movement, description, type_id) VALUES (?, ?, ?)',
    updateMovement: 'UPDATE movements SET movement = ?, description = ?, type_id = ? WHERE id = ?',
    deleteMovement: 'DELETE FROM movements WHERE id = ?',
};

module.exports = { movementQueries };
