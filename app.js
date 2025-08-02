// app.js
const express = require("express");
// const productRoutes = require("./routes/product.route");
const newsRoutes = require("./routes/news.route");
// const visitorCounter = require("./middleware/visitorCounter");
const applyCommonMiddleware = require("./middleware/commonMiddleware");
const authRoutes = require('./routes/auth.route');
const app = express();
require('dotenv').config();
// Middleware
applyCommonMiddleware(app);
// Routes
// app.use("/orders", orderRoutes);
app.use("/news", newsRoutes);
// // app.use("/products", productRoutes);
app.use('/auth', authRoutes);
// 404 handler
app.use((req, res) => {
  res.status(404).send({ message: "Not Found" });
});
module.exports = app; // 👈 Export app so server.js can use it
