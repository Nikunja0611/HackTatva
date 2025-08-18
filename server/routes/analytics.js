const router = require('express').Router();
const { Score } = require('../models/sql');
const SubmissionMeta = require('../models/mongo/SubmissionMeta');

router.get('/:eventId', async (req,res)=>{
  const subs = await SubmissionMeta.countDocuments({ eventId:Number(req.params.eventId) });
  const scores = await Score.findAll({ where:{ eventId:Number(req.params.eventId) } });
  const judges = new Set(scores.map(s=>s.judgeId)).size;
  const avg = scores.length ? (scores.reduce((a,b)=>a+b.total,0)/scores.length) : 0;
  res.json({ submissions: subs, judges, avgScore: Number(avg.toFixed(2)) });
});
module.exports = router;
