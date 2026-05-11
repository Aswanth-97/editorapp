const mongoose = require("mongoose");
const schema = mongoose.Schema;

const fileSchema = new schema(
  {
    filename: String,
    owner_id: { type: mongoose.Schema.ObjectId, ref: "users" },
    latestCommit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "text",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("file", fileSchema);
