const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/sql');

router.post('/register', async (req,res)=>{
  const { name, email, password } = req.body;
  const exists = await User.findOne({ where:{ email } });
  if(exists) return res.status(400).json({message:'Email in use'});
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash });
  const token = jwt.sign({ id:user.id, email }, process.env.JWT_SECRET, { expiresIn:'7d' });
  res.json({ token, user });
});

router.post('/login', async (req,res)=>{
  const { email, password } = req.body;
  const user = await User.findOne({ where:{ email } });
  if(!user) return res.status(401).json({message:'Invalid credentials'});
  const ok = await bcrypt.compare(password, user.passwordHash);
  if(!ok) return res.status(401).json({message:'Invalid credentials'});
  const token = jwt.sign({ id:user.id, email }, process.env.JWT_SECRET, { expiresIn:'7d' });
  res.json({ token, user });
});

module.exports = router;
