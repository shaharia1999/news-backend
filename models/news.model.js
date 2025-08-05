const mongoose = require('mongoose');
const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String }, // HTML rich text
    category: { type: String, required: true },
    subCategory: { type: String }, // Optional
    mainImage: { type: String, required: true },
    visitCount: { type: Number, default: 0 },
    images: [{ type: String }],
    // ✅ Optional new fields
    author: { type: String }, // Optional author name
    source: { type: String }, // Optional source
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

module.exports = mongoose.model('News', newsSchema);
