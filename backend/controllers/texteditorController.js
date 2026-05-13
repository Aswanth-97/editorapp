const file = require("../model/fileschema");
const users = require("../model/users");
const text = require("../model/textSchema");
const { version } = require("mongoose");

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

    const fileType = fileName.split(".").pop();
    const codeExtensions = ["js"];
    const editorType = codeExtensions.includes(fileType) ? "monaco" : "tiptap";

    const files = await file.create({
      filename: fileName,
      owner_id: foundUser_id,
      editorType: editorType,
    });
    res.status(200).json({ message: "file added successfully", file: files });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "file adding failed" });
  }
};

const saveContent = async (req, res) => {
  try {
    const { fileId, content, commitMsg } = req.body;

    if (!fileId || !content || !commitMsg) {
      return res
        .status(400)
        .json({ message: "fileId,content,commitMessage required" });
    }

    const foundFile = await file.findOne({ _id: fileId });

    if (!foundFile) res.status(404).json({ message: "File Not Found" });

    const foundUser = foundFile.owner_id;
    if (!foundUser) res.status(404).json({ message: "User Not Found" });

    const latestCommit = await text.findOne({ fileId }).sort({ version: -1 });
    const newVersion = latestCommit ? latestCommit.version + 1 : 1;

    const duplicateContent = await text.findOne({
      fileId: fileId,
      "content.text": content.text,
    });

    if (duplicateContent) {
      return res.status(400).json({ message: "Can not save same Content" });
    }

    const newText = await text.create({
      fileId: fileId,
      content: content,
      message: commitMsg,
      createdBy: foundUser,
      version: newVersion,
    });

    foundFile.latestCommit = newText._id;
    await foundFile.save();

    return res.status(200).json({ message: "commit sucessful", data: newText });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "server error", Error: error });
  }
};

module.exports = { getFile, postFile, saveContent };
