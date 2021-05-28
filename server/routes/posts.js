//TO CHECK PRIV ROUTES
const router = require('express').Router();
//MIDDLEWARE VERIFY TO MAKE THIS POST PRIVATE
const verify = require('./verifyToken');

router.get('/', verify, (req, res) =>{
    res.json({
        posts: {
        title: 'my first post',
        description: 'random data you shouldnt access'
        }
    })
})

module.exports = router;