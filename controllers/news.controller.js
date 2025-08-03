const slugify = require('slugify');
const News = require("../models/news.model");
const { visitCounts } = require('../middleware/visitorCounter');


// Create News
exports.createNews = async (req, res) => {
  try {
    const { title, description, category, mainImage, images } = req.body;

    if (!title || !category || !mainImage) {
      return res.status(400).json({ message: 'Required fields are missing.' });
    }

    const slug = slugify(title, { lower: true, strict: true });

    const existing = await News.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: 'A news article with this title already exists.' });
    }

    const news = new News({
      title,
      slug,
      description,
      category,
      mainImage,
      images,
    });

    const saved = await news.save();

    res.status(201).json({
      message: 'News created successfully.',
      news: saved,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllNews = async (req, res) => {
  try {
    const {
      search,
      category,
      createdAfter,
      createdBefore,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (category) filter.category = category;

    if (createdAfter || createdBefore) {
      filter.createdAt = {};
      if (createdAfter) filter.createdAt.$gte = new Date(createdAfter);
      if (createdBefore) filter.createdAt.$lte = new Date(createdBefore);
    }

    const pageNum = Math.max(Number(page), 1);
    const limitNum = Math.max(Number(limit), 1);
    const skip = (pageNum - 1) * limitNum;

    const [newsList, total] = await Promise.all([
      News.find(filter)
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(limitNum),
      News.countDocuments(filter),
    ]);

    res.json({
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      news: newsList,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getNewsBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const news = await News.findOne({ slug });

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    console.log(`Visit count for '${slug}': ${req.visitCount}`); // ✅ debug

    res.status(200).json({ data: news, visitCount: req.visitCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const updated = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).send({ message: "News not found" });
    }

    res.status(200).send({ message: "News updated", data: updated });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


exports.deleteNews = async (req, res) => {
  try {
    const deleted = await News.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).send({ message: "News not found" });
    }

    res.status(200).send({ message: "News deleted", data: deleted });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
// controllers/newsController.js
// controllers/newsController.js


exports.getTotalViewsPerCategory = async (req, res) => {
  try {
    // Get all unique categories from the News collection
    const categories = await News.distinct('category');
    const result = {};

    categories.forEach(category => {
      const slugs = visitCounts[category] || {};
      const totalViews = Object.values(slugs).reduce((sum, count) => sum + count, 0);
      result[category] = totalViews;
    });

    res.json(result); // e.g. { sport: 0, breaking: 0, politics: 0 }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




