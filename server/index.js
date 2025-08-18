require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const { initSocket } = require('./socket');
const { sql } = require('./config/sql');
const { connectMongo } = require('./config/mongo');

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api', (req,res)=>res.json({status:'ok'}));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/teams', require('./routes/teams'));
app.use('/api/submissions', require('./routes/submissions'));
app.use('/api/judging', require('./routes/judging'));
app.use('/api/announcements', require('./routes/announcements'));
app.use('/api/leaderboard', require('./routes/leaderboard'));
app.use('/api/analytics', require('./routes/analytics'));

const server = http.createServer(app);
initSocket(server);

(async () => {
  await sql.authenticate();
  await require('./models/sql').sync();   // create tables if not exist
  await connectMongo();
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log('API on', PORT));
})();
