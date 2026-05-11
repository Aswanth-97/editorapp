const jwt = require("jsonwebtoken");

const varifyJWT = async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (!authHeader?.startsWith("Bearer")) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) return res.sendStatus(403);

    req.user = decoded.userInfo.userName;
    req.roles = decoded.userInfo.roles;
    req.id = decoded.userInfo.id;

    next();
  });
};

module.exports = varifyJWT;
