const file = require("../model/fileschema");

const getText = async (req, res) => {
  try {
    res.status(200).json({ message: "okkkk doneeee" });
  } catch (error) {
    console.error(error);
  }
};

const postText = async (req, res) => {
  const { fileName } = req.body;

  console.log(fileName);

  try {
    if (!fileName)
      return res.status(400).json({ message: "file name required" });

    const searchFile = await file.findOne({ name: fileName });
    if (searchFile)
      return res
        .status(404)
        .json({ message: "file name already present in db" });

    const files = await file.create({ filename: fileName });
    res.status(200).json({ message: "file added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "file adding failed" });
  }
};

module.exports = { getText, postText };
