// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para entender JSON
app.use(express.urlencoded({ extended: true })); // Para entender datos de formularios

// Conexión a la Base de Datos
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB conectado exitosamente.'))
  .catch(err => console.error('Error al conectar con MongoDB:', err));

// Rutas
const announcementRoutes = require('./routes/announcement.routes');
app.use('/api/announcements', announcementRoutes); // Montamos las rutas de anuncios

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});