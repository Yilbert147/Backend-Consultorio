const jwt = require('jsonwebtoken');

// Middleware para proteger rutas
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    // Verificar el token
    jwt.verify(token, 'secreto_para_token', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        // Guardar la información del usuario en la request para usarla más adelante
        req.user = decoded;
        next();
    });
};
