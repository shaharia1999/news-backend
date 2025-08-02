

// adeptshaharia
// C9DWzWZzkBwSpU80
// const mongoose = require("mongoose");
// const connectDB = async () => {
//   try {
//     await mongoose.connect("mongodb://127.0.0.1:27017/testProductDb");
//     console.log("MongoDB connected successfully");

//     const collections = await mongoose.connection.db.listCollections().toArray();
//     const hasnewsCollection = collections.some(col => col.name === 'news');

//     if (hasnewsCollection) {
//       const indexes = await mongoose.connection.collection('news').indexes();
//       const hasNameIndex = indexes.find(index => index.name === 'name_1');

//       if (hasNameIndex) {
//         await mongoose.connection.collection('news').dropIndex('name_1');
//         console.log("Dropped index: name_1");
//       } else {
//         console.log("No index named 'name_1' found.");
//       }
//     } else {
//       console.log("Collection 'news' does not exist.");
//     }

//   } catch (err) {
//     console.error("MongoDB connection failed:", err.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
// mongodb+srv://adeptshaharia:yGktw1WU7gunNpyn@cluster0.uol7ajw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const mongoose = require("mongoose");
// Replace <db_password> with your actual MongoDB Atlas password.
// Ensure your IP address is whitelisted in MongoDB Atlas.
const uri = "mongodb+srv://adeptshaharia:yGktw1WU7gunNpyn@cluster0.uol7ajw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
 
      serverSelectionTimeoutMS: 30000, // Keep trying to send operations for 30 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    console.log("MongoDB Atlas connected successfully!");
    // Access the database name from the connection string or specify it
    const dbName = mongoose.connection.name;
    console.log(`Connected to database: ${dbName}`);
    // Check if the 'news' collection exists
    const collections = await mongoose.connection.db.listCollections().toArray();
    const hasnewsCollection = collections.some(col => col.name === 'news');
    if (hasnewsCollection) {
      console.log("Collection 'news' exists. Checking for index...");
      // Get indexes for the 'news' collection
      const indexes = await mongoose.connection.collection('news').indexes();
      const hasNameIndex = indexes.find(index => index.name === 'name_1');
      if (hasNameIndex) {
        // If 'name_1' index exists, drop it
        await mongoose.connection.collection('news').dropIndex('name_1');
        console.log("Dropped index: name_1 from 'news' collection.");
      } else {
        console.log("No index named 'name_1' found on 'news' collection.");
      }
    } else {
      console.log("Collection 'news' does not exist. Skipping index check.");
    }
  } catch (err) {
    console.error("MongoDB Atlas connection failed:", err.message);
    // Exit process with failure
    process.exit(1);
  }
};
module.exports = connectDB;


