const express = require("express");
const router = express.Router();
const newsController = require("../controllers/news.controller");
const { visitorCounter } = require("../middleware/visitorCounter");

router.post("/", newsController.createNews);
router.get("/", newsController.getAllNews);
router.get("/:slug",visitorCounter, newsController.getNewsBySlug);
router.patch("/:id", newsController.updateNews);
router.delete("/:id", newsController.deleteNews);

module.exports = router;
