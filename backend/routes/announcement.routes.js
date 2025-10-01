const express = require('express');
const router = express.Router();
const multer = require('multer');
const announcementController = require('../controllers/announcement.controller');

// --- Configuración de Multer para la subida de archivos ---
const storage = multer.diskStorage({
  // Define la carpeta de destino para los archivos subidos
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  // Define el nombre del archivo para evitar colisiones
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// --- Definición de las Rutas del CRUD de Anuncios ---

// 1. CREAR un nuevo anuncio
//    - Se usa el middleware 'upload' para manejar una imagen y un archivo.
router.post(
  '/',
  upload.fields([{ name: 'image', maxCount: 1 }, { name: 'file', maxCount: 1 }]),
  announcementController.create
);

// 2. LEER todos los anuncios
router.get('/', announcementController.findAll);

// 3. LEER un único anuncio por su ID
router.get('/:id', announcementController.findOne);

// 4. ACTUALIZAR un anuncio por su ID
//    - También usa 'upload' por si se desea cambiar la imagen o el archivo.
router.put(
  '/:id',
  upload.fields([{ name: 'image', maxCount: 1 }, { name: 'file', maxCount: 1 }]),
  announcementController.update
);

// 5. ELIMINAR un anuncio por su ID
router.delete('/:id', announcementController.delete);

// Se exporta el router para ser utilizado en server.js
module.exports = router;