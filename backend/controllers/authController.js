const user = require("../model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handileLogin = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password)
    return res
      .status(400)
      .json({ message: "username and password are required " });

  const foundUser = await user.findOne({ userName: userName }).exec();

  if (!foundUser) return res.sendStatus(404);

  const match = await bcrypt.compare(password, foundUser.password);

  if (match) {
    const roles = Object.values(foundUser.roles);

    const accessToken = jwt.sign(
      { userInfo: { userName: foundUser.userName, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" },
    );

    const refreshToken = jwt.sign(
      { userInfo: { userName: userName } },
      process.env.REFERSH_TOKEN_SECRET,
      { expiresIn: "1d" },
    );

    foundUser.refreshToken = refreshToken;

    const result = await foundUser.save();

   

    res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 900000 });
    res.status(200).json({ accessToken: accessToken });
  } else {
    res.sendStatus(404);
  }
};

module.exports = { handileLogin };
