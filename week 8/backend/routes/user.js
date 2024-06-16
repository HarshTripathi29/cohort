// This route needs to get user information, do input validation using zod and store the information in the database provided
// 1. Inputs are correct (validated via zod)
// 2. Database doesn’t already contain another user
// If all goes well, we need to return the user a jwt which has their user id encoded as follows -

//1. Signup

const express = require("express");
const zod = requuire("zod");
const User = require("../db");
const {authMiddleware} = require("../middlewares")
const router = express.Router();
const app = express();

// Inputs are correct (validated via zod)
const signUpBody = zod.object({
    username : zod.string().email(),
    password : zod.string(),
    firstname : zod.string(),
    lastname : zod.string(),
})

router.post("signup",async function(req,res){
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

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

// 3. Route to update user information
// User should be allowed to `optionally` send either or all of

//1. password
//2. firstName
//3. lastName

//Whatever they send, we need to update it in the database for the user.
//Use the `middleware` we defined in the last section to authenticate the user

//Method: PUT
//Route: /api/v1/user

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        _id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})

//2. Route to get users from the backend, filterable via firstName/lastName
// This is needed so users can search for their friends and send them money

//Method: GET
//Route: /api/v1/user/bulk
//Query Parameter: `?filter=harkirat`

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;