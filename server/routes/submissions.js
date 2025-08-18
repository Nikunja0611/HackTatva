const router = require('express').Router();
const auth = require('../middleware/auth');
const SubmissionMeta = require('../models/mongo/SubmissionMeta');
const { getContainer } = require('../config/blob');
const multer = require('multer');
const crypto = require('crypto');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/:eventId/:teamId', auth, upload.single('file'), async (req,res)=>{
  const container = await getContainer();
  const key = `${req.params.eventId}/${req.params.teamId}/${crypto.randomUUID()}-${req.file.originalname}`;
  const blockBlobClient = container.getBlockBlobClient(key);
  await blockBlobClient.uploadData(req.file.buffer, { blobHTTPHeaders: { blobContentType: req.file.mimetype } });

  const meta = await SubmissionMeta.create({
    eventId:Number(req.params.eventId),
    teamId:req.params.teamId,
    repoUrl:req.body.repoUrl||'',
    videoUrl:req.body.videoUrl||'',
    docUrl:req.body.docUrl||'',
    blobKey:key
  });
  res.json(meta);
});

router.get('/:eventId', async (req,res)=>{
  res.json(await SubmissionMeta.find({ eventId:Number(req.params.eventId) }).sort({createdAt:-1}));
});

module.exports = router;
