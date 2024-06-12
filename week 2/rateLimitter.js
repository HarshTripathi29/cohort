const express = require("express");
const app = express();

let noOfRequest = 0;

function calculateRequests(req,res,next){
    noOfRequest++;
    console.log(noOfRequest);
    next();
}

app.use(calculateRequests());

app.post("/rate", function(req,res){
    res.status(411).json({
        msg : "Hi there"
    })
} );

app.listen(1000);