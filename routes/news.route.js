const express = require("express");
const router = express.Router();
const newsController = require("../controllers/news.controller");
const { visitorCounter } = require("../middleware/visitorCounter");
router.post("/", newsController.createNews);
router.get("/",visitorCounter, newsController.getAllNews);
router.get('/data/top-views', newsController.getTotalViewsPerCategory);
router.get('/:slug', visitorCounter, newsController.getNewsBySlug);
// API for total views per category (no param)
router.patch("/:id", newsController.updateNews);
router.delete("/:id", newsController.deleteNews);

module.exports = router;
