const express = require("express");
const shortid = require("shortid");
const { URL, connectToMongoDB } = require("./models/url");
const validator = require("validator");

const app = express();
const PORT = 5000;
const BASE_URL = `http://localhost:${PORT}`;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() => {
  console.log("MongoDB connected");
});

app.use(express.json());

// POST /shorten - Create short URL
app.post("/shorten", async (req, res) => {
  const { url, expiry } = req.body;

  if (!url || !validator.isURL(url)) {
    return res.status(400).json({ error: "Invalid or missing URL" });
  }

  const shortId = shortid();
  const newEntry = {
    shortId,
    redirectURL: url,
    visitHistory: [],
  };

  if (expiry && !isNaN(Date.parse(expiry))) {
    newEntry.expiresAt = new Date(expiry);
  }

  await URL.create(newEntry);

  return res.status(201).json({
    shortUrl: `${BASE_URL}/${shortId}`,
  });
});

// GET /:shortId - Redirect to original URL
app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;

  const entry = await URL.findOne({ shortId });

  if (!entry) return res.status(404).send("Short URL not found");

  if (entry.expiresAt && Date.now() > entry.expiresAt.getTime()) {
    return res.status(410).send("Short URL has expired");
  }

  entry.visitHistory.push({ timestamp: Date.now() });
  await entry.save();

  res.redirect(entry.redirectURL);
});

// GET /analytics/:shortId - Show click analytics
app.get("/analytics/:shortId", async (req, res) => {
  const { shortId } = req.params;

  const entry = await URL.findOne({ shortId });

  if (!entry) return res.status(404).json({ error: "Not found" });

  return res.json({
    totalClicks: entry.visitHistory.length,
    analytics: entry.visitHistory,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
