const mongoose = require("mongoose");
const schema = mongoose.Schema;
const textSchema = new schema({
  fileId: { type: mongoose.Schema.ObjectId, ref: file, required: true },

  content: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },

  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  version: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("text", textSchema);
