const router = require('express').Router();
const { Event } = require('../models/sql');
const auth = require('../middleware/auth');

router.get('/', async (req,res)=> res.json(await Event.findAll({ order:[['id','DESC']] })));

router.post('/', auth, async (req,res)=>{
  const event = await Event.create({ ...req.body, createdBy:req.user.id });
  res.json(event);
});

router.put('/:id', auth, async (req,res)=>{
  await Event.update(req.body, { where:{ id:req.params.id }});
  res.json(await Event.findByPk(req.params.id));
});

router.delete('/:id', auth, async (req,res)=>{
  await Event.destroy({ where:{ id:req.params.id }});
  res.json({ ok:true });
});

module.exports = router;
