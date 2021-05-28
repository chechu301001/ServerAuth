const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


//info of user which we can get
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

//HASHING PASSWORD
const saltRounds = 12;//complexity of generated string
userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, saltRounds);
        this.cpassword = await bcrypt.hash(this.cpassword, saltRounds);
    }
    next();
});
//add hashed password to new user


const User = mongoose.model('USER', userSchema);
module.exports = User;

