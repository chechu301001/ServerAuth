const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res)=>{
    
    //VALIDATE USER RESPONSE
    //RETURNS OBJECT. BUT WE NEED ONLY ERROR MESSAGE
    const {error} = registerValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    } else {
        console.log('User data is being sent to DB');
    }

    //CHECKING IF EXISTING IN DB
    const userEmailExist = await User.findOne({email: req.body.email});
    if(userEmailExist) return res.status(400).send('Email already exists.');
    

    //CREATING A NEW USER
    const {name, email, phone, password, cpassword} = req.body;
    const user = new User({
        name,
        email,
        phone,
        password,
        cpassword
    });
    try {
        //BCRYPT WILL FINISH HASHING IN SCHEMA PAGE
        //THIS IS SINCE I DESTRUCTURED

        const savedUser = await user.save();
        res.send(savedUser);
        console.log('Registered Successfully.');
    } catch (err) {
        res.status(400).send(err);
    }
});

//LOGIN
router.post('/login', async (req, res) =>{
    //VALIDATE USER RESPONSE
    const {error} = loginValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    } else {
        console.log('User credentials checked.');
    }

    //CHECKING IF REGISTERED EMAIL IS EXISTING 
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email or Password is incorrect.');
    
    //PASSWORD COMPARING
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid credentials.');

    //CREATE AND ASSIGN TOKEN    
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
    //HEADER HAS TOKEN


    //COOKIE TOKEN!Get back here
    // const expireCookie = 2592*1000000;
    // res.cookie('jwtoken', token, {
    //     expires: new Date(Date.now() + expireCookie),
    //     httpOnly: true
    // });


    console.log('LOGGED IN!');
});


module.exports = router;
