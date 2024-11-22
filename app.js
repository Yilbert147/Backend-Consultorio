const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const casoRoutes = require('./routes/casoRoutes');

var cors = require("cors");

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/api', casoRoutes);  // Ruta para los casos

app.listen(9898, () => {
    console.log('Servidor corriendo en puerto 9898');
});
