const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

//-----------Postman Connected-----------

//mongoose connect to db
const DB = process.env.DB_CONNECT;
const PORT = process.env.PORT;
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>{
    console.log('connection successfull');
}).catch((err)=>console.log(err));
//------------DB Connected---------------

//Middleware
app.use(express.json());

app.use('/api/user', authRoute);//This gets added in the route
app.use('/api/posts', postRoute);
app.listen(PORT, ()=> console.log(`server is running in port ${PORT}`));