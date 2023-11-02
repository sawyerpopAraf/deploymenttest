const { Router } = require("express");
const { save } = require("../save_json");
const AWS = require("aws-sdk");
const s3 = new AWS.S3()




router.post('/', function(req, res, next) {
    const {randomText}=req.body;
    save(randomText);
    res.json({randomText})

    });


