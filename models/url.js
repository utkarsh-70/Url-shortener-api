const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  shortId: { type: String, required: true, unique: true },
  redirectURL: { type: String, required: true },
  visitHistory: [{ timestamp: { type: Number } }],
  expiresAt: { type: Date }, // Optional expiry
}, { timestamps: true });

const URL = mongoose.model("URL", urlSchema);

async function connectToMongoDB(url) {
  return mongoose.connect(url);
}

module.exports = { URL, connectToMongoDB };
