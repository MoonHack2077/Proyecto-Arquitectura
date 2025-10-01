// controllers/announcement.controller.js
const announcementService = require('../services/announcement.service');

/**
 * @description Crea un nuevo anuncio
 * @route POST /api/announcements
 */
exports.create = async (req, res) => {
  try {
    const { titulo, descripcion, esPublico } = req.body;

    // Construye el objeto de datos del anuncio
    const announcementData = {
      titulo,
      descripcion,
      esPublico,
    };
    
    // Asigna las URLs de los archivos si se subieron
    if (req.files?.image) {
      announcementData.imagenUrl = `/uploads/${req.files.image[0].filename}`;
    }
    if (req.files?.file) {
      announcementData.archivoUrl = `/uploads/${req.files.file[0].filename}`;
    }

    const announcement = await announcementService.createAnnouncement(announcementData);
    res.status(201).json({ message: "Anuncio creado exitosamente", data: announcement });
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el anuncio', error: error.message });
  }
};

/**
 * @description Obtiene todos los anuncios
 * @route GET /api/announcements
 */
exports.findAll = async (req, res) => {
  try {
    const announcements = await announcementService.getAllAnnouncements();
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los anuncios', error: error.message });
  }
};

/**
 * @description Obtiene un único anuncio por su ID
 * @route GET /api/announcements/:id
 */
exports.findOne = async (req, res) => {
  try {
    const announcement = await announcementService.getAnnouncementById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: 'Anuncio no encontrado' });
    }
    res.status(200).json(announcement);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el anuncio', error: error.message });
  }
};

/**
 * @description Actualiza un anuncio por su ID
 * @route PUT /api/announcements/:id
 */
exports.update = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Si se suben nuevos archivos, actualiza las URLs
    if (req.files?.image) {
      updateData.imagenUrl = `/uploads/${req.files.image[0].filename}`;
    }
    if (req.files?.file) {
      updateData.archivoUrl = `/uploads/${req.files.file[0].filename}`;
    }

    const updatedAnnouncement = await announcementService.updateAnnouncementById(req.params.id, updateData);
    
    if (!updatedAnnouncement) {
      return res.status(404).json({ message: 'Anuncio no encontrado para actualizar' });
    }
    res.status(200).json({ message: "Anuncio actualizado exitosamente", data: updatedAnnouncement });
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el anuncio', error: error.message });
  }
};

/**
 * @description Elimina un anuncio por su ID
 * @route DELETE /api/announcements/:id
 */
exports.delete = async (req, res) => {
  try {
    const deletedAnnouncement = await announcementService.deleteAnnouncementById(req.params.id);
    if (!deletedAnnouncement) {
      return res.status(404).json({ message: 'Anuncio no encontrado para eliminar' });
    }
    res.status(200).json({ message: 'Anuncio eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el anuncio', error: error.message });
  }
};