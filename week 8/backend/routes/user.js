// This route needs to get user information, do input validation using zod and store the information in the database provided
// 1. Inputs are correct (validated via zod)
// 2. Database doesn’t already contain another user
// If all goes well, we need to return the user a jwt which has their user id encoded as follows -

//1. Signup

const express = require("express");
const zod = requuire("zod");
const User = require("../db");
const router = express.Router();
const app = express();

// Inputs are correct (validated via zod)
const signUpBody = zod.object({
    username : zod.string().email(),
    password : zod.string(),
    firstname : zod.string(),
    lastname : zod.string(),
})

app.post("signup",async function(req,res){
    const {success} = signUpBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg : "user already exist or invalid credentials"
        })
    }
    
    // Database doesn’t already contain another user
    const existingUser = await User.findOne({
        username : req.body.username,
    })
    
    if(existingUser){
        return res.status().json({
            msg : "user already exists",
        })
    }

    const user = User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });

    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})

// ## **2. Route to sign in**
// Let’s an existing user sign in to get back a token.
// Method: POST 
// Route: /api/v1/user/signin

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }


    res.status(411).json({
        message: "Error while logging in"
    })
})

module.exports = router;