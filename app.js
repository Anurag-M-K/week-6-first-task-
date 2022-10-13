const express = require('express');
const app = express();
const logger = require('morgan');
const indexRouter = require('./routes/index')
const db = require('./config/connection')
const expressLayout =require('express-ejs-layouts')
const path = require('path')
const port = 9000
const session = require('express-session')
const cookieParser = require('cookie-parser');

app.use(logger('dev'))
app.use(expressLayout)
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))//user adikkunna inputs serverilekk parse cheyyan
app.set('views',path.join(__dirname,'views'))
app.set('layout','./layout/layout')
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser())
app.use(session({secret:'thisismysecretecode',saveUninitialized:true,cookie:{maxAge:60000},resave:false}))


app.use(function (req, res, next) {
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
});



db.connect((err)=>{
    if(err) console.log('failed');
    else console.log("connected")
});
app.use(express.json())
app.use('/',indexRouter);



app.listen(port)


