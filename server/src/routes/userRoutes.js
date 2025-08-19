// server/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /api/usuarios
router.get('/', userController.getAllUsers);

// POST /api/usuarios
router.post('/', userController.createUser);

module.exports = router;
