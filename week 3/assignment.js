const express = require("express");
const jwt = require("jsonwebtoken");

const jwtpassword = "123456";
const app = express();
app.use(express.json());


// it is an in memory db
const ALL_USERS = [{
        name : "Harsh",
        password : "123321",
        username : "harsh@gmail.com"
    },
    {
        name : "tripathi",
        password : "123321",
        username : "tripathi@gmail.com"
    },
    {
        name : "modi",
        password : "123321",
        username : "modi@gmail.com"
    }
]

//this function checks whether the username and password provided by the user 
//matches with any of the records in the in memory db.
function userExists(username, password){
    let userExist = false;
    for(let i=0; i<ALL_USERS.length; i++){
    if(ALL_USERS[i].username==username && ALL_USERS[i].password==password){
        userExist = true;
    }
    return userExist;
}
}

// now lets create a signup route and send user data to the db. in a fresh file.
app.post("/signup", function(req, res){

})

app.post("/signin", function(req,res){
    // take username and password form the user in the request body
    const username = req.body.username;
    const password = req.body.password;
    // if the user does not exist return a message
    if(!userExists(username, password)){
        return res.status(403).json({
            msg : "user doesnot exist in memoey db"
        });
    }
// if the user exist then return a jwt token
var token = jwt.sign({username : username}, jwtpassword);
return res.json({
    token
});
});

app.get("/users", function(req,res){
    const token = req.headers.authorization;
    // verify function takes the token and the token as the input and returns something if it is valid token
    const decoded = jwt.verify(token, jwtpassword);
    const username = decoded.username;
    // returning an array of all the users from the in memory db if the user is signed in.
    res.json({
        users : ALL_USERS,
    })
    // return only the 

})

app.listen(1000);