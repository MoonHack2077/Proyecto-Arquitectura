// models/announcement.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const announcementSchema = new Schema({
  titulo: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  imagenUrl: {
    type: String,
  },
  archivoUrl: {
    type: String,
  },
  esPublico: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true, // Crea campos createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('Announcement', announcementSchema);