const express = require('express');
const cors = require('cors'); // 👈 NUEVO: Importamos CORS
require('dotenv').config(); 

const sequelize = require('./config/db');
//rutas
const statusRoutes = require('./routes/statusRoutes.js');
const jugadorRoutes = require('./routes/jugadorRoutes'); 
const partidoRoutes = require('./routes/partidoRoutes'); 
const participacionRoutes = require('./routes/participacionRoutes');
const authRoutes = require('./routes/authRoutes'); 

//modelos
const Jugador = require('./models/Jugador'); 
const Partido = require('./models/Partido');
const Participacion = require('./models/Participacion');

const app = express(); 

// 👈 NUEVO: Le damos permiso a la página web de conectarse
app.use(cors()); 
app.use(express.json()); 

app.use('/api/status', statusRoutes);
app.use('/api/jugadores', jugadorRoutes); 
app.use('/api/partidos', partidoRoutes); 
app.use('/api/participaciones', participacionRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        // 👈 CAMBIO IMPORTANTE: 'alter: true' actualiza las tablas sin borrarlas
        await sequelize.sync({ alter: true });
        
        console.log(' Conexión exitosa. Base de datos actualizada y tablas sincronizadas.');

        app.listen(PORT, () => {
            console.log(` CourtMatch corriendo en: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(' Error de conexión:', error);
    }
}

startServer();