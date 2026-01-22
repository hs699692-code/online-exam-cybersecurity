const mongoose = require('mongoose');

const MAX_RETRIES = 5;
let retries = 0;

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MongoDB Connection Error: MONGO_URI not set. Check your .env and working directory.');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message || err);
    if (retries < MAX_RETRIES) {
      retries += 1;
      const delay = 1000 * Math.pow(2, retries); // exponential backoff
      console.log(`Retrying to connect in ${delay}ms (attempt ${retries}/${MAX_RETRIES})`);
      setTimeout(connectDB, delay);
    } else {
      console.error('Exceeded max retries. Exiting.');
      process.exit(1);
    }
  }

  mongoose.connection.on('connected', () => {
    console.log('Mongoose event: connected');
  });
  mongoose.connection.on('error', (err) => {
    console.error('Mongoose event: error', err);
  });
  mongoose.connection.on('disconnected', () => {
    console.warn('Mongoose event: disconnected');
  });
};

module.exports = connectDB;
