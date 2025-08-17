const express = require("express");
const router = express.Router();
const newsController = require("../controllers/news.controller");
const { visitorCounter } = require("../middleware/visitorCounter");
const verifyToken = require("../middleware/auth.middleware");
const RoleCheck = require("../middleware/RoleCheck");
router.post("/",verifyToken, RoleCheck(['moderator', 'admin']), newsController.createNews);
router.get("/", newsController.getAllNews);
router.get('/data/top-views', newsController.getTotalViewsPerCategory);
router.get('/:slug', visitorCounter, newsController.getNewsBySlug);
// API for total views per category (no param)
router.patch("/:id",verifyToken, RoleCheck(['moderator', 'admin']), newsController.updateNews);
router.delete("/:id",verifyToken, RoleCheck(['moderator', 'admin']), newsController.deleteNews);

module.exports = router;
