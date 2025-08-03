// // middleware/visitorCounter.js

const visitCounts = {}; // { category: { slug: count } }

const visitorCounter = (req, res, next) => {
  const { slug } = req.params;
  const category = req.query.category || 'general';

  if (!visitCounts[category]) {
    visitCounts[category] = {};
  }

  if (visitCounts[category][slug]) {
    visitCounts[category][slug]++;
  } else {
    visitCounts[category][slug] = 1;
  }

  req.visitCount = visitCounts[category][slug];
  next();
};

module.exports = { visitorCounter, visitCounts };
