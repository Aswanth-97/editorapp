const file = require("../model/fileschema");
const users = require("../model/users");
const user = require("../model/users");

const getFile = async (req, res) => {
  try {
    const result = await file.find({ owner_id: req.id });
    res.status(200).json({ message: "okkkk doneeee", data: result });
  } catch (error) {
    console.error(error);
  }
};

const postFile = async (req, res) => {
  const { fileName } = req.body;

  try {
    const foundUser = await users.findOne({ userName: req.user });

    if (!foundUser) {
      return res.status(401).json({ message: "User not found" });
    }

    const foundUser_id = foundUser._id;

    if (!fileName)
      return res.status(400).json({ message: "file name required" });

    const searchFile = await file.findOne({ filename: fileName });
    if (searchFile)
      return res
        .status(409)
        .json({ message: "file name already present in db" });

    const files = await file.create({
      filename: fileName,
      owner_id: foundUser_id,
    });
    res.status(200).json({ message: "file added successfully", file: files });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "file adding failed" });
  }
};

module.exports = { getFile, postFile };
