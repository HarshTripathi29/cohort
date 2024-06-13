const express = require("express");
const app = express();

app.get("/", function(req, res){
    res.json({
        msg : "hello harsh"
    })
});

app.listen(2000);