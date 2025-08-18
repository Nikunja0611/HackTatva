const router = require('express').Router();
const Team = require('../models/mongo/Team');
const Message = require('../models/mongo/Message');
const auth = require('../middleware/auth');

router.get('/:eventId', async (req,res)=>{
  res.json(await Team.find({ eventId:Number(req.params.eventId) }));
});

router.post('/:eventId', auth, async (req,res)=>{
  const team = await Team.create({ eventId:Number(req.params.eventId), name:req.body.name, members:[{userId:req.user.id}] });
  res.json(team);
});

router.post('/:eventId/:teamId/invite', auth, async (req,res)=>{
  const team = await Team.findById(req.params.teamId);
  team.members.push({ userId:req.body.userId, email:req.body.email });
  await team.save();
  res.json(team);
});

router.get('/:eventId/:teamId/messages', async (req,res)=>{
  res.json(await Message.find({ eventId:Number(req.params.eventId), teamId:req.params.teamId }).sort({ts:-1}).limit(100));
});

router.post('/:eventId/:teamId/messages', auth, async (req,res)=>{
  const m = await Message.create({ eventId:Number(req.params.eventId), teamId:req.params.teamId, userId:req.user.id, text:req.body.text });
  res.json(m);
});

module.exports = router;
