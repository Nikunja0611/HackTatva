const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
  const token = (req.headers.authorization||'').replace('Bearer ','');
  if(!token) return res.status(401).json({message:'No token'});
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; next();
  }catch(e){ return res.status(401).json({message:'Invalid token'}); }
};
