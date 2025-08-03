// // Example usage
// const newArticle = new News({
//   title: 'Breaking News Title',
//   slug: 'breaking-news-title',
//   description: 'Details of the news...',
//   category: 'Politics',
//   mainImage: 'main-image-url.jpg',
//   images: ['img1.jpg', 'img2.jpg'],
// });

// await newArticle.save();
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String }, // Will store HTML rich text
  category: { type: String, required: true },
  subCategory: { type: String }, // <-- Add this line // <-- Add this line
  mainImage: { type: String, required: true },
  visitCount: { type: Number, default: 0 },
  images: [{ type: String }],
}, { timestamps: true }); // This adds createdAt and updatedAt fieldsThis adds createdAt and updatedAt fields

module.exports = mongoose.model('News', newsSchema);module.exports = mongoose.model('News', newsSchema);
