const mongoose = require('mongoose');
async function connectMongo(){
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Mongo connected');
}
module.exports = { connectMongo, mongoose };
