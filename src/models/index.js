const Jugador = require('./Jugador');
const Partido = require('./Partido');
const Participacion = require('./Participacion');
const Deporte = require('./Deporte');

Deporte.hasMany(Jugador, { foreignKey: 'idDeporteFavorito' });
Jugador.belongsTo(Deporte, { foreignKey: 'idDeporteFavorito' });

Deporte.hasMany(Partido, { foreignKey: 'idDeporte' });
Partido.belongsTo(Deporte, { foreignKey: 'idDeporte' });

Jugador.belongsToMany(Partido, { through: Participacion, foreignKey: 'idUser' });
Partido.belongsToMany(Jugador, { through: Participacion, foreignKey: 'idMatch' });

module.exports = { Jugador, Partido, Participacion, Deporte };