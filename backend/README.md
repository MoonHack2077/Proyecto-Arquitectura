# Backend para Gestión de Anuncios (Implementación SOLID)

Este documento describe la arquitectura y la implementación del backend para el módulo de **Gestión de Anuncios**, desarrollado con **Node.js**, **Express** y **Mongoose**.  
El diseño de este sistema se basa en los principios **SOLID** para garantizar un código mantenible, escalable y robusto.

---

## Relación con el Proyecto TFG-G5836

El documento *"Actualización y ampliación de funcionalidades de una web desarrollada con NodeJS" (TFG-G5836)* establece como objetivo principal la modificación y extensión de una plataforma existente. Específicamente, se menciona la necesidad de añadir un nuevo apartado de **tablón de anuncios**.

Una arquitectura basada en principios SOLID es la respuesta directa a los desafíos de un proyecto de este tipo:

- **Facilita la Modificación**: Al tener responsabilidades bien definidas y un bajo acoplamiento, añadir o cambiar funcionalidades se vuelve más seguro y predecible.  
- **Promueve la Escalabilidad**: Permite que nuevas características, como el tablón de anuncios, se integren como módulos cohesivos sin desestabilizar el código existente.  
- **Mejora la Mantenibilidad**: Un código limpio y organizado reduce el tiempo necesario para corregir errores o realizar futuras actualizaciones.  

Esta implementación es, por tanto, la materialización de cómo abordar los objetivos del TFG aplicando las mejores prácticas de la ingeniería de software.

---

## Principios SOLID en la Práctica ⚙️

### 1. Principio de Responsabilidad Única (SRP)
Cada archivo tiene **una sola responsabilidad**:

- `announcement.model.js`: Define el esquema de datos del anuncio.  
- `announcement.routes.js`: Define las rutas de la API y conecta los endpoints con el controlador.  
- `announcement.controller.js`: Actúa como intermediario entre las peticiones HTTP y los servicios.  
- `announcement.service.js`: Orquesta la lógica de negocio, valida datos y maneja casos de uso principales.  

---

### 2. Principio de Abierto/Cerrado (OCP)
El sistema está **abierto a extensiones**, pero **cerrado a modificaciones**.

**Ejemplo práctico**:  
Si se necesita enviar una notificación por email al crear un anuncio, no se modifica `announcement.service.js`.  
En su lugar, se implementa un sistema de eventos:  
- El servicio emite un evento `anuncio.creado`.  
- Un módulo `notification.service.js` se suscribe y maneja el envío de correos.  

---

### 3. Principio de Sustitución de Liskov (LSP)
Jerarquías de clases coherentes.

**Aplicación a futuro**:  
Si el sistema incluye tipos de anuncios como `AnuncioUrgente` o `AnuncioEvento`, ambos deben comportarse como `Anuncio` base sin afectar al resto del sistema.  

---

### 4. Principio de Segregación de Interfaces (ISP)
No forzar a un cliente a depender de interfaces que no usa.

**Ejemplo práctico (roles del TFG)**:  
- `GET /api/public/announcements`: Endpoint público con solo datos necesarios (título, descripción).  
- `GET /api/admin/announcements`: Endpoint privado para editores con datos completos (autor, estado, etc.).  

---

### 5. Principio de Inversión de Dependencias (DIP)
Los módulos de alto nivel dependen de **abstracciones** y no de implementaciones concretas.

- **Alto Nivel**: `announcement.controller.js`  
- **Medio Nivel**: `announcement.service.js`  
- **Bajo Nivel**: `mongoose` (acceso a datos)  

**Ejemplo**:  
El servicio debería depender de una abstracción (`AnnouncementRepository`) y no directamente de Mongoose. Esto facilita la inyección de dependencias y pruebas unitarias.

---

## Estructura del Proyecto

```bash
backend/
├── controllers/
│   └── announcement.controller.js
├── models/
│   └── announcement.model.js
├── routes/
│   └── announcement.routes.js
├── services/
│   └── announcement.service.js
├── uploads/
├── .env
├── package.json
└── server.js

---

## Cómo Empezar 🚀

### Prerrequisitos
- **Node.js** (v14 o superior)  
- **npm**  
- **MongoDB** instalado y corriendo localmente  

---

### Instalación y Configuración

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>

2. Navega a la carpeta backend e instala las dependencias:
   ```bash
   cd backend
   npm install

3. Crea un archivo .env en la raíz del proyecto y configura tu conexión a MongoDB:
   ```bash
   MONGO_URI=mongodb+srv://juanma:juanma@cluster0.jonhfny.mongodb.net/anunciosDB?retryWrites=true&w=majority



## Ejecución 🚀
```bash
   node server.js

### La API estará disponible en:
👉 http://localhost:5000
