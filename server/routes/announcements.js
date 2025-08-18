const router = require('express').Router();
const { emitLeaderboard } = require('../socket');

router.post('/:eventId', (req,res)=>{
  const ioPayload = { message: req.body.message, ts: Date.now() };
  // reuse socket.io channel "announce"
  // Clients should listen to 'announce' in room event:<id>
  require('../socket').emitLeaderboard(req.params.eventId, { announce: ioPayload }); // or create a dedicated emitter
  res.json({ ok:true });
});
module.exports = router;
