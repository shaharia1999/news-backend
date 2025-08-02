

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
  description: { type: String },
  category: { type: String, required: true },
  mainImage: { type: String, required: true },
  images: [{ type: String }],
}, { timestamps: true }); // This adds createdAt and updatedAt fields

module.exports = mongoose.model('News', newsSchema);
