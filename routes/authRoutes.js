const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../helpers/authMiddleware');

// Ruta para registrar un usuario
router.post('/register', authController.register);

// Ruta para hacer login
router.post('/login', authController.login);

// Ruta protegida - solo accesible con token válido
router.get('/protected', authMiddleware.verifyToken, (req, res) => {
    res.json({ message: `Acceso concedido. Bienvenido, ${req.user.username}!` });
});

module.exports = router;
