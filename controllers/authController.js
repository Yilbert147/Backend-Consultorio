const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Almacenar temporalmente los usuarios
const users = [];

// Función para registrar un usuario
exports.register = async (req, res) => {
    const { username, password } = req.body;

    // Validar si el usuario ya existe
    const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear y almacenar el nuevo usuario
    const newUser = { username, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
};

// Función para el login
exports.login = async (req, res) => {
    const { username, password } = req.body;

    // Buscar el usuario por nombre de usuario
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Comparar la contraseña ingresada con la almacenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Generar un token JWT
    const token = jwt.sign({ username: user.username }, 'secreto_para_token', { expiresIn: '1h' });

    res.json({ message: 'Login exitoso', token });
};
