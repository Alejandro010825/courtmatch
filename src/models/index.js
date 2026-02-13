const Jugador = require('./Jugador');
const Partido = require('./Partido');
const Participacion = require('./Participacion');

Jugador.belongsToMany(Partido, { through: Participacion, foreignKey: 'idUser' });
Partido.belongsToMany(Jugador, { through: Participacion, foreignKey: 'idMatch' });

module.exports = { Jugador, Partido, Participacion };