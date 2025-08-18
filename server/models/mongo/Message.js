const { mongoose } = require('../../config/mongo');
const MessageSchema = new mongoose.Schema({
  eventId: Number, teamId: String, userId: Number,
  text: String, ts: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Message', MessageSchema);
