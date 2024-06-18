const express = require("express");
const zod = require("zod");
const User = require("./db");
const jwt = require("jsonwebtoken");
const router = express.router();
const jwtsecret = "harsh";

const signUpBody = zod.object({
    username : zod.string(),
    firstName : zod.string(),
    lastName : zod.string(),
    password : zod.string().min(6)
})

router.post("/signup", function(req,res){

    const {success} = signUpBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg : "invalid credentials"
        })
    }

    const existingUser = User.findOne({
        username : req.body.username,
    })

    if(existingUser){
        return res.status(411).json({
            msg : "User already registered"
        })
    }

    User.create({
        username : req.body.username,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : req.body.password,
    })

    const userId = User._id;

    const token = jwt.sign({userId}, jwtsecret);

    return res.status(200).json({
        msg : "User successfully registered",
        token

    })
})

const signInBody = zod.object({
    username : zod.string(),
    password : zod.password(),
})

router.post("/signin",function(req,res){
    const {success} = signInBody.safeParse(req.body);
    if(!success)
        {
            return res.status(411).json({
                msg : "Invalid credentials",
            })
        }
    
    const userExists = User.findOne({
        username : req.body.username,
        password : req.body.password,
    })

    if (!userExists)
    {
        return res.status(411).json({
            msg : "user not registered"
        })
    }
    
    const userId = User._id;

    if(userExists)
        {
            const token = jwt.jwt({userId}, jwtsecret);

        }

    return res.status(200).json({
        msg : "user signed in",
        token : token,
    })
})

module.exports = router;