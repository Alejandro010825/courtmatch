const jugadorService = require('../services/jugadorService');
const { Jugador, Partido } = require('../models'); 

const registrar = async (req, res) => {
    try {
        const jugador = await jugadorService.crearJugador(req.body);
        res.status(201).json({
            mensaje: '¡Jugador creado con éxito!',
            jugador: jugador
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const obtenerJugadores = async (req, res) => {
    try {
        const jugadores = await Jugador.findAll(); 
        res.json(jugadores);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al obtener los jugadores');
    }
};

const obtenerMisPartidos = async (req, res) => {
    try {
        const { id } = req.params; 

        const jugador = await Jugador.findByPk(id, {
            include: [{
                model: Partido,
                through: { attributes: [] } 
            }]
        });

        if (!jugador) {
            return res.status(404).json({ error: 'Jugador no encontrado' });
        }

        res.json({
            jugador: jugador.nombreUsuario,
            misPartidos: jugador.Partidos 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los partidos del jugador' });
    }
};

module.exports = { 
    registrar, 
    obtenerJugadores,
    obtenerMisPartidos 
};