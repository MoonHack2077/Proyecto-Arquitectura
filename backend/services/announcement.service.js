// services/announcement.service.js
const Announcement = require('../models/announcement.model');

// Crea un nuevo anuncio en la BD
const createAnnouncement = async (announcementData) => {
  const newAnnouncement = new Announcement(announcementData);
  return await newAnnouncement.save();
};

// Obtiene todos los anuncios de la BD
const getAllAnnouncements = async () => {
  return await Announcement.find().sort({ createdAt: -1 });
};

// Obtiene un anuncio por su ID
const getAnnouncementById = async (id) => {
  return await Announcement.findById(id);
};

// Actualiza un anuncio por su ID
const updateAnnouncementById = async (id, updateData) => {
  return await Announcement.findByIdAndUpdate(id, updateData, { new: true });
};

// Elimina un anuncio por su ID
const deleteAnnouncementById = async (id) => {
  return await Announcement.findByIdAndDelete(id);
};

module.exports = {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncementById,
  deleteAnnouncementById,
};