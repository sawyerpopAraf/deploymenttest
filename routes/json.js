const { Router } = require("express");
const { save } = require("../save_json");
const AWS = require("aws-sdk");
const s3 = new AWS.S3()

const router = new Router();



router.post('/', async function(req, res, next) {
    const {randomText} = req.body;
    await save(randomText);
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
