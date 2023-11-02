const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const s3 = new AWS.S3()

const save = async (randomText) => {
  console.log("saving");
  await s3.putObject({
    Body: JSON.stringify(randomText, null, 2),
    Bucket: "your_bucket_name",
    Key: "number.json",
  }).promise()
};

module.exports = { save };