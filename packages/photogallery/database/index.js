const mongoose = require('mongoose');
const seedData = require('../seed/generateSeedData');
const seedMongodb = require('../seed/seedMongodb');
const { dropCollection } = require('./dropCollection');

if (process.env.NODE_ENV !== 'production') {
  console.log('in development!!');
  require('dotenv').config({ path: "../.deploy.env"});
} else {
  console.log('in production!!');
  require('dotenv').config({ path: "../.production.env"});
}

const db = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.DEV_ATLAS_PROJECT}.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log('MongoDB Connected...');

    await dropCollection();

    await seedMongodb(seedData);
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
