const { mongoose } = require('../../config/mongo');
const TeamSchema = new mongoose.Schema({
  eventId: Number,
  name: String,
  members: [{ userId: Number, email: String }],
});
module.exports = mongoose.model('Team', TeamSchema);
