const mongoose = require('mongoose');
const dns = require('dns');

dns.setServers(['1.1.1.1', '8.8.8.8']);

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error('MONGO_URI nije definisan u .env fajlu');
    }

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`MongoDB povezan: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Greska pri povezivanju sa MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
