const mongoose = require('mongoose');

const casoSchema = new mongoose.Schema({
    tipo: { type: String, required: true },
    descripcion: { type: String, required: true },
    creadoPor: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now }
});

const Caso = mongoose.model('Caso', casoSchema);

module.exports = Caso;
