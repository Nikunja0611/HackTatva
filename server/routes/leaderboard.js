const router = require('express').Router();
const { Score } = require('../models/sql');

router.get('/:eventId', async (req,res)=>{
  const rows = await Score.findAll({ where:{ eventId:Number(req.params.eventId) } });
  const agg = {};
  rows.forEach(r => { agg[r.teamId] = (agg[r.teamId] || 0) + r.total; });
  const leaderboard = Object.entries(agg).map(([teamId,total])=>({ teamId, total })).sort((a,b)=>b.total-a.total);
  res.json(leaderboard);
});

module.exports = router;
