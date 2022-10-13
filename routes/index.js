const bcrypt = require('bcrypt') 
const express = require('express');

const router = express.Router()
const userHelper = require('../helper/user-helper')
const jwt = require('jsonwebtoken')
const JWT_SECRET = '567890641567890/'


router.get('/',(req,res)=>{
    if(req.session.user){
        res.render('pages/home')
    }else{
        res.render('pages/login')
    }
})
router.get('/signup',(req,res)=>{
    res.render('pages/signup')
})
router.get('/logout', (req,res)=>{
    res.render('pages/login')
})

 router.post('/signup-action',async (req,res)=>{
    const{name,confirmname,email,password:PlainTextPassword,confirmpassword:PlainTextConfirmPassword,submit} = req.body
 
   const password = await bcrypt.hashSync(PlainTextPassword,10) // await- wait cheyyunnu
   const confirmpassword = await bcrypt.hashSync(PlainTextPassword,10)
   console.log(req.body)
    res.render('pages/home')


    try
    {
        const response =await userHelper.create({
            name,
            confirmname,
            email,
            password,
            confirmpassword,
            submit


        })
        console.log('created')
    


    }
    catch(error){
    console.log("error")
    }
})

router.post('/login-action',async function(req,res){
    console.log(req.body);
    const{email,password} = req.body
    
    //If you're executing a query and sending the results without modification to, say, an Express response, you should use lean. 
    const user = await userHelper.findOne({email}).lean()
    if(!user){
        return res.render('pages/login')
    }

    if(await bcrypt.compare(password,user.password)){
        const token = jwt.sign({
            id: user._id,
            email: user.email
        },
        JWT_SECRET 
        )
        req.session.user=req.body.email
        
        return res.render('pages/home')
    }

    res.render('/');
})

router.get("/logout",(req,res) =>{
    req.session.destroy(function(err){
        if(err){
            console.log(err)
            res.send("error");
        }else{
            res.render("pages/login")
            
            
        }
    })
})

module.exports=router