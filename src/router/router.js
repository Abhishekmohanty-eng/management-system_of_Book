const express=require('express')
const router=express.Router()
const userController = require("../controler/userControler")
const bookController=require('../controler/BOOKcontroler')
const likes=require("../controler/linkscontroler")
const passportAuth2=("passportAuth2")
// const bookController = require("../controler/")
const {authentication,authorization}=require("../middleWare/auth")


//
const passport = require('passport');
const session = require('express-session')
require('../auth/stratagies/googlelogin');
  
router.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,
}))


    
  
router.get('/', (req, res) => {
    res.json({authURL: "http:localhost:3000/auth"})
    res.send("<button><a href='/auth'>Login With Google</a></button>")
});
  
router.get('/auth' , passport.authenticate('google', { scope:
    [ 'email', 'profile' ]
}));
  
router.get( '/auth/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/callback/success',
        failureRedirect: '/auth/callback/failure'
}));
  
router.get('/auth/callback/success' , (req , res) => {

    // 
    // console.log(req.session, req.user)
    if(!req.user)
        return res.redirect('/login');
    // user is in DB? , Add user in DB

    res.send("Welcome " + req.user.email);
});
  

router.get("/auth/callback", passport.authenticate( 'google', {
  successRedirect: '/api/auth/callback/success',
  failureRedirect: 'api/auth/callback/failure'
}))

const isAuthenticated = (req, res,next) =>{

  try{ console.log(req.isAuthenticated())
   if(req.isAuthenticated()) { return next() }
   else res.redirect('/api')
}catch(err){
   res.status(500).json({message:err.message})
}
}

router.get("/protected", isAuthenticated ,(req,res)=>{
    res.send("PROTECTED")
})

router.get('/auth/callback/failure' , (req , res) => {
    res.sendit("Error");
})
  

//


 
 

//

router.post('/register', userController.createUser)
router.post('/login', userController.loginUser)

router.post('/books', authentication,authorization,bookController.createBook)
router.get('/books',authentication,bookController.getBook)
router.get('/books/:bookId',authentication,bookController.getBookById)
router.put('/books/:bookId',authentication,authorization,bookController.updateBook)
router.delete('/books/:bookId',authentication,authorization,bookController.deleteBook)

router.post("/like/:id",authentication,authorization,likes)


module.exports=router