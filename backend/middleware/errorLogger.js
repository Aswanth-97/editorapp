const { logger } = require("./logevents");

const errorLogger = async (err, req, res, next) => {
  logger(`${err.name}\t${err.message}`, "errorLogger.txt");

  res.status(500).send(err.message);

  
};

module.exports = errorLogger;
