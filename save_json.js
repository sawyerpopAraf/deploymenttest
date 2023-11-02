const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const s3 = new AWS.S3()

const save = async (randomText) => {
  console.log("saving");
  await s3.putObject({
    Body: JSON.stringify(randomText, null, 2),
    Bucket: "cyclic-scary-glasses-hare-eu-north-1",
    Key: "randomText.json",
  }).promise()
};

module.exports = { save };