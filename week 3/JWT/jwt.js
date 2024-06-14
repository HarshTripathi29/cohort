const express = require("express");
const jwt = require("jsonwebtoken");

//The secret key is a string used to sign the token. 
//It ensures that the token can be verified and trusted.
const jwtpassword = "123456";
const app = express();
app.use(express.json());

app.post("/signin", function(req, res){

    // payload 
    const username = req.query.uname;
    const password = req.query.pass;
    
    //sign() creates the signature.
    const token = jwt.sign({username : username, password : password}, jwtpassword);
    console.log("Generated token : ", token);
    res.json({
        token,
    });
})

// A token can be verified using the secret key only so it cannot be done by everyone. 
app.get("/verify", function(req, res){
    // When a client (like a web browser) makes a request to a server endpoint that requires auth, 
    // it sends the JWT token along with the request. Get the token from authorization.
    const token = req.headers.authorization;
    const verified = jwt.verify(token,jwtpassword);
    console.log("verified : ", verified);
    res.json({
        verified,
    });
});

// We dont need the secret key to decode the token so it can be decoded by everyone.
app.get("/decode", function(req, res){
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);
    console.log("decoded : ", decoded);
    res.json({
        decoded,
    })
});

app.listen(2000, ()=>{
    console.log("server running at port 2000");
});