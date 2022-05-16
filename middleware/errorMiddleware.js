const errorTalker = (err, _req, res, _next) => {
    res.status(err.status || 500).json({ error: err.message });
};

module.exports = errorTalker;