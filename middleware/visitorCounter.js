const visitCounts = {}; // In-memory count
const visitorCounter = (req, res, next) => {
  const slug = req.params.slug; 
  if (visitCounts[slug]) {
    visitCounts[slug]++;
  } else {
    visitCounts[slug] = 1;
  }

  req.visitCount = visitCounts[slug];
  next();
};

module.exports = { visitorCounter };
