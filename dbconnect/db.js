
const mongoose = require("mongoose");
// const uri = process.env.MONGODB_URI ;
const uri = 'mongodb+srv://adeptshaharia:yGktw1WU7gunNpyn@cluster0.uol7ajw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
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


