const express = require("express");
const zod = require("zod");
const {User} = require("../db");  // Ensure the correct path to your User model
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const router = express.Router();
const jwtsecret = "harsh";

const signUpBody = zod.object({
    username: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(6)
});

router.post("/signup", async function(req, res) {
    const { success, error } = signUpBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            msg: "invalid credentials",
            error: error.errors // Send validation errors to the client
        });
    }

    let existingUser;
    try {
        existingUser = await User.findOne({
            username: req.body.username,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Error checking for existing user"
        });
    }

    if (existingUser) {
        return res.status(409).json({
            msg: "User already registered"
        });
    }

    let user;
    try {
        user = await User.create({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Error creating user"
        });
    }

    const userId = user._id;
    const token = jwt.sign({ userId }, jwtsecret);

    return res.status(200).json({
        msg: "User successfully registered",
        token
    });
});

const signInBody = zod.object({
    username : zod.string(),
    password : zod.string().min(6),
})

router.post("/signin",async function(req,res){
    const {success} = signInBody.safeParse(req.body);
    if(!success)
        {
            return res.status(411).json({
                msg : "Invalid credentials",
            })
        }
    
    const userExists = await User.findOne({
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

    let token;
    if(userExists)
        {
            token = jwt.sign({userId}, jwtsecret);

        }

    return res.status(200).json({
        msg : "user signed in",
        token : token,
    })
})

module.exports = router;