const user = require("../model/users");
const bcrypt = require("bcrypt");

const registerController = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password)
    return res
      .status(400)
      .json({ message: "username and password are required!" });

  const duplicate = await user.findOne({ userName: userName });
  if (duplicate) return res.sendStatus(409);

  try {
    const saltRound = 10;

    const bpwd = await bcrypt.hash(password, saltRound);

    console.log(bpwd);

    const result = await user.create({
      userName: userName,
      password: bpwd,
    });
    res.status(200).json({ message: `new user ${userName} created` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = registerController;
