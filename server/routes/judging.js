const router = require('express').Router();
const SubmissionMeta = require('../models/mongo/SubmissionMeta');
const { Score } = require('../models/sql');
const AI = require('../services/ai');
const auth = require('../middleware/auth');
const { emitLeaderboard } = require('../socket');

router.get('/:eventId/submissions', async (req,res)=>{
  const items = await SubmissionMeta.find({ eventId:Number(req.params.eventId) });
  res.json(items);
});

router.post('/:eventId/:submissionId/ai', auth, async (req,res)=>{
  const s = await SubmissionMeta.findById(req.params.submissionId);
  s.aiSummary = await AI.summarize({ repoUrl:s.repoUrl, docUrl:s.docUrl });
  s.plagiarism = await AI.plagiarismScore({ repoUrl:s.repoUrl, docUrl:s.docUrl });
  await s.save();
  res.json(s);
});

router.post('/:eventId/score', auth, async (req,res)=>{
  const score = await Score.create({ eventId:Number(req.params.eventId), teamId:req.body.teamId, judgeId:req.user.id, criteria:req.body.criteria, total:req.body.total });
  // recompute leaderboard (very naive)
  const rows = await Score.findAll({ where:{ eventId:Number(req.params.eventId) } });
  const agg = {};
  rows.forEach(r => { agg[r.teamId] = (agg[r.teamId] || 0) + r.total; });
  const leaderboard = Object.entries(agg).map(([teamId,total])=>({ teamId, total })).sort((a,b)=>b.total-a.total);
  emitLeaderboard(req.params.eventId, leaderboard);
  res.json({ score, leaderboard });
});

module.exports = router;
