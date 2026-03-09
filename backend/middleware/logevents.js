const express = require("express");
const path = require("path");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromise = fs.promises;

const logger = async (message, filename) => {
  const dateTime = format(new Date(), "MMMM do, yyyy 'at' \t h:mm a");

  const logData = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "loggs"))) {
      fsPromise.mkdir(path.join(__dirname, "..", "loggs"), {
        recursive: true,
      });
    }

    await fsPromise.appendFile(
      path.join(__dirname, "..", "loggs", filename),
      logData,
    );
  } catch (error) {
    console.error(error);
  }
};

const loggs = async (req, res, next) => {

  logger(`${req.url}\t${req.method}\t${req.headers["origin"]}`, "eventLogger.txt");

  next()
};


module.exports={logger,loggs}