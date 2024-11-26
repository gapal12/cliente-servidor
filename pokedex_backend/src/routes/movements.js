const { Router } = require('express');
const { getAll, getByID, addMovement, updateMovement, deleteMovement } = require('../controllers/movements');

const movementRouter = Router();

movementRouter.get('/', getAll);
movementRouter.get('/:id', getByID);
movementRouter.post('/', addMovement);
movementRouter.put('/:id', updateMovement);
movementRouter.delete('/:id', deleteMovement);

module.exports = {
    movementRouter
};
