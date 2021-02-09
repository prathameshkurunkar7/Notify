const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const compression = require('compression');
const authRouter = require('./routers/authRouter');
const notesRouter = require('./routers/notesRouter');
const userRouter = require('./routers/userRouter');

const app = express();

app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(cors());
app.use(compression())

app.set('trust proxy', 1);
 
const apiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1hr
    max: 100,
    message: 'Too many requests from this IP,please try again later.'
});

app.use(express.json({limit:'300kb'}));
app.use(express.urlencoded({extended:false}));

app.use('/uploads/images',express.static(path.join('uploads','images')));

// all routes here
app.use('/api/register/',apiLimiter,authRouter)
app.use('/api/notes/',notesRouter)
app.use('/api/user/',userRouter)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// error handling middleware
app.use((error, req, res, next) => {
    if(req.file){
        fs.unlink(req.file.path,(err)=>{
            if(err) console.log(err);
        });
    }
    if (res.headerSent) {
        return next(error)
    }
    
    // Checking for operational/trusted errors
    if(error.isOperational){
        res.status(error.code);
        res.json({ message: error.message});
    }
    
    // Unknown or Development based errors
    else{
        console.error(error)
        res.status(500).json({
            message: 'An Unknown Error has Occured'
        });
    }
});

module.exports = app;