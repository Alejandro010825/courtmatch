const { Jugador } = require('../models');
const bcrypt = require('bcrypt'); 
const crearJugador = async (userData) => {
    const salt = await bcrypt.genSalt(10);
    
    const hashedPassword = await bcrypt.hash(userData.contraseña, salt);
    
    const nuevoJugador = await Jugador.create({
        ...userData,
        contraseña: hashedPassword
    });
    
    return nuevoJugador;
};

module.exports = { crearJugador };