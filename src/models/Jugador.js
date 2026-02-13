const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs'); 
const Jugador = sequelize.define('Jugador', {
    idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreUsuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    },
    partidosGanados: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    partidosJugados: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'jugadores',
    timestamps: false,
    hooks: {
        beforeCreate: async (jugador) => {
            const salt = await bcrypt.genSalt(10);
            jugador.contraseña = await bcrypt.hash(jugador.contraseña, salt);
        }
    }
});

module.exports = Jugador;