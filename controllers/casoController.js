// Almacenamos temporalmente los casos en un array
let casos = [];

// Función para crear un nuevo caso
exports.crearCaso = (req, res) => {
    const { tipo, descripcion } = req.body;
    const nuevoCaso = {
        id: casos.length + 1,
        tipo,
        descripcion,
        creadoPor: req.user.username,
        fechaCreacion: new Date()
    };
    casos.push(nuevoCaso);
    res.status(201).json({ message: 'Caso creado exitosamente', caso: nuevoCaso });
};

// Función para listar todos los casos
exports.listarCasos = (req, res) => {
    res.json(casos);
};

// Función para obtener un caso específico por su ID
exports.obtenerCaso = (req, res) => {
    const { id } = req.params;
    const caso = casos.find(c => c.id === parseInt(id));

    if (!caso) {
        return res.status(404).json({ message: 'Caso no encontrado' });
    }

    res.json(caso);
};

// Función para actualizar un caso por su ID
exports.actualizarCaso = (req, res) => {
    const { id } = req.params;
    const { tipo, descripcion } = req.body;

    const caso = casos.find(c => c.id === parseInt(id));
    if (!caso) {
        return res.status(404).json({ message: 'Caso no encontrado' });
    }

    caso.tipo = tipo;
    caso.descripcion = descripcion;
    res.json({ message: 'Caso actualizado exitosamente', caso });
};

// Función para eliminar un caso por su ID
exports.eliminarCaso = (req, res) => {
    const { id } = req.params;
    casos = casos.filter(c => c.id !== parseInt(id));

    res.json({ message: 'Caso eliminado exitosamente' });
};
