var express = require('express');
var router = express.Router();
const CyclicDB = require('@cyclic.sh/dynamodb')
const db = CyclicDB(process.env.CYCLIC_DB)
let dish = db.collection('dishes')



/* GET home page. */
router.get('/', async function(req, res, next) {
  let dishes=await dish.list()
  res.send(dishes)

});

router.post('/',async function(req, res, next) {
    const {name,country}=req.body
    await dish.set(name,{
        country:country
    })
    res.end()
})

router.get('/:name',async function(req,res,next){
    let dishDetail=await dish.get(req.params.name)
    res.send(dishDetail)



})

module.exports = router;
