const { sql } = require('../../config/sql');
const User = require('./User');
const Event = require('./Event');
const Score = require('./Score');

User.initModel(sql);
Event.initModel(sql);
Score.initModel(sql);

User.hasMany(Event, { foreignKey:'createdBy' });
Event.belongsTo(User, { foreignKey:'createdBy' });

Score.belongsTo(Event, { foreignKey:'eventId' });

module.exports = { sql, User, Event, Score, sync: () => sql.sync() };
