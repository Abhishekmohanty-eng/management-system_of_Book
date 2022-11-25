const express=require('express')
const app=express()

const bodyparser=require('body-parser')
const router = require('./router/router')
 app.use(bodyparser.json())
//
const passport = require('passport');
const session = require('express-session')
app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,
}))
app.use(passport.initialize());
app.use(passport.session());

 const mongoose=require('mongoose')
 mongoose.connect("mongodb+srv://Pratice:MVLNdVEz62Td6t7j@cluster0.q9vy5.mongodb.net/KRDS-BOOK-MANaGEMENT",
    { useNewUrlParser: true })
    .then(()=>console.log("mongoDB is Connected!!"))
    .catch(err=>console.log(err))

    app.use('/',router)

    app.listen(process.env.PORT||3000,()=>{
        console.log("server connected at Port :",process.env.PORT||3000)
    })
