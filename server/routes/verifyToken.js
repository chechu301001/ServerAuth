const jwt = require('jsonwebtoken');

//MIDDLEWARE FUNCTION
//FOR EVERY PRIVATE ROUTE
//CHECKING THE HEADER AUTH-TOKEN
module.exports = function (req, res, next) {
    //CHECK IF EXISTING
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    //JWT VERIFY
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token.');
    }
}