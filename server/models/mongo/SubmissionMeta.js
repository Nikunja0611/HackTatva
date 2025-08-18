const { mongoose } = require('../../config/mongo');
const SubmissionMeta = new mongoose.Schema({
  eventId: Number, teamId: String,
  repoUrl: String, videoUrl: String, docUrl: String,
  blobKey: String, aiSummary: String, plagiarism: Number,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('SubmissionMeta', SubmissionMeta);
