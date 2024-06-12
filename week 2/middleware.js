const express = require("express");

const app = express();

function userMiddleware(req, res, next){
    const username = req.headers.username;
    const password = req.headers.password;
    if(username!="harsh" && password!="pass")
        {
            res.status(403).json({
                msg : "incorrect inputs"
            })
        }
        else{
            next();
        }
} 

function kidneyMiddleware(req, res, next){
    const kidneyId = req.query.kidneyid;
    if(kidneyId!=1 && kidneyId!=2)
        {
            res.status(403).json({
                mag : "kidney not good"
            })
        }
        else{
            next();
        }
}
app.get('/heart',userMiddleware, function(req, res){
    res.send("your heart is healthy");
})

app.get('/kidney', userMiddleware, kidneyMiddleware, function(req, res){
    res.send("your kidney is healthy");
})

// global catches
app.use(function(err, req, res, next){
    res,json({
        msg : "sorry something is up with the server"
    })
});

app.listen(9000);