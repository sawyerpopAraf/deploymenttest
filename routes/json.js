var express = require('express');
var router = express.Router();
const { save } = require("../save_json");
const AWS = require("aws-sdk");
const s3 = new AWS.S3()



const getCurrentData = async () => {
    try {
        const data = await s3.getObject({
            Bucket: "cyclic-scary-glasses-hare-eu-north-1",
            Key: "randomText.json",
        }).promise();
        
        return JSON.parse(data.Body.toString());
    } catch (error) {
        return [];
    }
};

router.post('/', async function(req, res, next) {
    const {randomText} = req.body;
    
    // Get the current data from S3
    const currentData = await getCurrentData();
    
    // Append new data
    currentData.push(randomText);
    
    // Save updated data to S3
    await save(currentData);

    res.json({ randomText });
});


router.get('/', async function(req, res, next) {
      try {
            const data = await s3.getObject({
                Bucket: "cyclic-scary-glasses-hare-eu-north-1",
                Key: "randomText.json",
            }).promise();
            
            const retrievedText = JSON.parse(data.Body.toString());
            res.json({ randomText: retrievedText });
        } catch (error) {
            res.status(500).json({ error: "Error retrieving data" });
        }
    });

    module.exports = router;
