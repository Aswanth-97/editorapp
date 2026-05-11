const users = require("../model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleRefresh = async (req, res) => {
  const cookie = req.cookies;
  const user = req.user;
 
  if (!cookie) return res.sendStatus(401);

  const refreshToken = cookie.jwt;

  const foundUser = await users.findOne({ refreshToken: refreshToken }).exec();
  // console.log("foundudser", foundUser);

  if (!foundUser) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.userName !== decoded.userInfo.userName)
      return res.sendStatus(401);

    const roles = Object.values(foundUser.roles);

    const accessToken = jwt.sign(
      {
        userInfo: { userName: decoded.userInfo.userName, roles: roles },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" },
    );

    res.json({ accessToken });
  });
};

module.exports = { handleRefresh };
