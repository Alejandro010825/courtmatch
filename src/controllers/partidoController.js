const { Partido, Jugador } = require('../models');

const crearPartido = async (req, res) => {
    try {
        const nuevoPartido = await Partido.create(req.body);
        res.status(201).json({
            mensaje: 'Partido programado con éxito',
            partido: nuevoPartido
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const obtenerPartidos = async (req, res) => {
    try {
        const partidos = await Partido.findAll({
            include: [{
                model: Jugador,
                attributes: ['nombreUsuario'], 
                through: { 
                    attributes: [] 
                }
            }]
        });
        res.json(partidos);
    } catch (error) {
        console.error('Error en Sequelize:', error);
        res.status(500).json({ 
            error: 'Error al obtener los partidos',
            detalle: error.message 
        });
    }
};

module.exports = { 
    crearPartido, 
    obtenerPartidos 
};