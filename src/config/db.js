// const mongoose = require("mongoose");
// require("dotenv").config();

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error("❌ MongoDB Connection Failed:", error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

require('dotenv').config(); // Must be at the top

const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI | 1000;

  if (!mongoUri) {
    console.error('❌ MONGO_URI is undefined');
    process.exit(1); // Exit with failure
  }

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Connection Failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

