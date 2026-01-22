// (new) backend/connect-test.js
require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('No MONGO_URI found in env. Check your .env location and working directory.');
  process.exit(1);
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Test: MongoDB connected successfully');
    return mongoose.connection.close();
  })
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Test: MongoDB connection error:');
    console.error(err);
    process.exit(1);
  });
